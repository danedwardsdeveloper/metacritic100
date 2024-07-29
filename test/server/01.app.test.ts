import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { jwtSecret, expressEnv } from '../../server/utils/environmentChecks.js';

const request = supertest(app);

const VALID_USER = {
	name: 'Dan',
	email: 'dan@gmail.com',
	password: 'securePassword',
};

const generateRandomString = (length: number = 8): string =>
	randomBytes(length).toString('hex');

const createTemporaryUser = () => ({
	name: generateRandomString(),
	email: `test_${Date.now()}@example.com`,
	password: 'password123',
});

describe('API Tests', () => {
	describe('Welcome message', () => {
		it('should return 200 and correct message on /api', async () => {
			const response = await request.get('/api').expect(200);
			expect(response.body).toHaveProperty('message', 'MetaCritic100 API');
		});
	});

	describe('Authentication', () => {
		let validToken: string;
		let temporaryUser: ReturnType<typeof createTemporaryUser>;
		let temporaryUserId: string;
		let temporaryUserToken: string;

		beforeAll(async () => {
			validToken = jwt.sign(
				{ name: VALID_USER.name, userId: '66a56a870a4d84411b3f43fc' },
				jwtSecret,
				{ expiresIn: '1h' }
			);

			temporaryUser = createTemporaryUser();
			const createResponse = await request
				.post('/api/create-account')
				.send(temporaryUser)
				.expect(201);
			temporaryUserId = createResponse.body.userId;

			const signInResponse = await request
				.post('/api/sign-in')
				.send({
					email: temporaryUser.email,
					password: temporaryUser.password,
				})
				.expect(200);
			temporaryUserToken = signInResponse.headers['set-cookie'][0]
				.split(';')[0]
				.split('=')[1];
		});

		afterAll(async () => {
			await request
				.delete('/api/delete-account')
				.set('Cookie', `token=${temporaryUserToken}`)
				.expect(200);
		});

		describe('POST /api/sign-in', () => {
			it('should fail login with incorrect email', async () => {
				await request
					.post('/api/sign-in')
					.send({
						email: 'wronguser@gmail.com',
						password: VALID_USER.password,
					})
					.expect(401)
					.expect({ message: 'Invalid credentials' });
			});

			it('should fail login with incorrect password', async () => {
				await request
					.post('/api/sign-in')
					.send({ email: VALID_USER.email, password: 'wrongPassword' })
					.expect(401)
					.expect({ message: 'Invalid credentials' });
			});

			it('should login successfully with correct credentials', async () => {
				const response = await request
					.post('/api/sign-in')
					.send(VALID_USER)
					.expect(200);

				expect(response.body).toMatchObject({
					message: 'Signed in successfully',
					name: VALID_USER.name,
				});
				expect(response.body.userId).toMatch(/^[a-f0-9]{24}$/);
				expect(response.headers['set-cookie']).toBeDefined();
			});
		});

		describe('GET /api/validate-token', () => {
			it('should return 200 if a valid token is provided', async () => {
				const response = await request
					.get('/api/validate-token')
					.set('Cookie', `token=${validToken}`)
					.expect(200);

				expect(response.body).toHaveProperty('name', VALID_USER.name);
				expect(response.body).toHaveProperty('userId');
			});

			it('should return 401 if no token is provided', async () => {
				await request
					.get('/api/validate-token')
					.expect(401)
					.expect({ message: 'No token provided' });
			});

			it('should return 401 if an invalid token is provided', async () => {
				const invalidToken = jwt.sign(
					{ email: 'fake@example.com' },
					'wrong_secret',
					{ expiresIn: '1h' }
				);
				await request
					.get('/api/validate-token')
					.set('Cookie', `token=${invalidToken}`)
					.expect(401)
					.expect({ message: 'Invalid token' });
			});
		});

		describe('POST /api/sign-out', () => {
			it('should logout successfully and clear the token cookie', async () => {
				const response = await request
					.post('/api/sign-out')
					.set('Cookie', `token=${validToken}`)
					.expect(200)
					.expect({ message: 'Signed out successfully' });

				const cookies = response.headers['set-cookie'];
				expect(cookies).toBeDefined();

				let tokenCookie: string | undefined;

				if (Array.isArray(cookies)) {
					tokenCookie = cookies.find((cookie) =>
						cookie.startsWith('token=')
					);
				} else if (typeof cookies === 'string') {
					tokenCookie = cookies.startsWith('token=') ? cookies : undefined;
				}

				expect(tokenCookie).toBeDefined();
				expect(tokenCookie).toContain('token=;');
				expect(tokenCookie).toContain('HttpOnly');
				expect(tokenCookie).toContain(
					expressEnv === 'production' ? 'SameSite=Strict' : 'SameSite=None'
				);
			});

			it('should fail to sign out without a token', async () => {
				await request
					.post('/api/sign-out')
					.expect(401)
					.expect({ message: 'No token provided' });
			});
		});
	});

	describe('Account Management', () => {
		describe('POST /api/create-account', () => {
			it('should return 400 if required fields are missing', async () => {
				await request
					.post('/api/create-account')
					.send({ name: 'incomplete' })
					.expect(400)
					.expect({ message: 'Missing required fields' });
			});

			it('should return 409 if name already exists', async () => {
				await request
					.post('/api/create-account')
					.send(VALID_USER)
					.expect(409);
			});

			it('should return 409 if email already exists', async () => {
				const newUser = { ...VALID_USER, name: 'New Name' };
				await request.post('/api/create-account').send(newUser).expect(409);
			});

			it('should create a new account successfully', async () => {
				const newUser = createTemporaryUser();
				const response = await request
					.post('/api/create-account')
					.send(newUser)
					.expect(201);

				expect(response.body).toMatchObject({
					message: 'User created successfully',
					name: newUser.name,
				});
				expect(response.body).toHaveProperty('userId');

				// Clean up
				const signInResponse = await request
					.post('/api/sign-in')
					.send({ email: newUser.email, password: newUser.password })
					.expect(200);
				const token = signInResponse.headers['set-cookie'][0]
					.split(';')[0]
					.split('=')[1];
				await request
					.delete('/api/delete-account')
					.set('Cookie', `token=${token}`)
					.expect(200);
			});
		});

		describe('DELETE /api/delete-account', () => {
			it('should return 401 if no token is provided', async () => {
				await request
					.delete('/api/delete-account')
					.expect(401)
					.expect({ message: 'No token provided' });
			});

			it('should return 404 if account does not exist', async () => {
				const nonexistentUserToken = jwt.sign(
					{ name: 'Ghost', userId: '123456789012345678901234' },
					jwtSecret,
					{ expiresIn: '1h' }
				);

				await request
					.delete('/api/delete-account')
					.set('Cookie', `token=${nonexistentUserToken}`)
					.expect(404)
					.expect({ message: 'User not found' });
			});
		});
	});
});
