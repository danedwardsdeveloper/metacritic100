import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const request = supertest(app);

import { jwtSecret, expressEnv } from '../../server/utils/environmentChecks.js';

describe('API welcome message', () => {
	it('should return 200 on /api', async () => {
		const response = await request.get('/api');
		expect(response.status).toBe(200);
	});

	it('should return JSON with "MetaCritic100 API"', async () => {
		const response = await request
			.get('/api')
			.expect('Content-Type', /json/)
			.expect(200);

		expect(response.body).toHaveProperty('message', 'MetaCritic100 API');
	});
});

const validToken = jwt.sign(
	{
		name: 'Dan',
		userId: '66a56a870a4d84411b3f43fc',
	},
	jwtSecret,
	{ expiresIn: '1h' }
);

describe('POST /api/sign-in', () => {
	it('should fail login with incorrect email', async () => {
		const response = await request
			.post('/api/sign-in')
			.send({ email: 'wronguser@gmail.com', password: 'securePassword' })
			.expect('Content-Type', /json/)
			.expect(401);

		expect(response.body).toHaveProperty('message', 'Invalid credentials');
		expect(response.headers['set-cookie']).toBeUndefined();
	});

	it('should fail login with incorrect password', async () => {
		const response = await request
			.post('/api/sign-in')
			.send({ email: 'user@gmail.com', password: 'wrongPassword' })
			.expect('Content-Type', /json/)
			.expect(401);

		expect(response.body).toHaveProperty('message', 'Invalid credentials');
		expect(response.headers['set-cookie']).toBeUndefined();
	});

	let userId: string;

	it('should login successfully with correct credentials', async () => {
		const response = await request
			.post('/api/sign-in')
			.send({ email: 'dan@gmail.com', password: 'securePassword' })
			.expect('Content-Type', /json/)
			.expect(200);

		expect(response.body).toMatchObject({
			message: 'Signed in successfully',
			name: 'Dan',
		});

		expect(response.body.userId).toMatch(/^[a-f0-9]{24}$/);
		userId = response.body.userId;

		expect(response.headers['set-cookie']).toBeDefined();
	});
});

describe('GET /api/validate-token', () => {
	it('should return 200 if a valid token is provided', async () => {
		const response = await request
			.get('/api/validate-token')
			.set('Cookie', `token=${validToken}`);

		expect(response.status).toBe(200);

		const responseBody = JSON.stringify(response.body);
		expect(responseBody).toContain('name');
		expect(responseBody).toContain('userId');
		expect(responseBody).toContain('Dan');
		expect(responseBody).toMatch(/[a-f\d]{24}/i);
	});

	it(`should return 'No token provided' if no token is provided`, async () => {
		const response = await request.get('/api/validate-token');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message: 'No token provided',
		});
	});

	const incorrectJwtSecret = `123456789`;

	const invalidToken = jwt.sign(
		{
			email: 'dan@example.com',
			password: 'securePassword',
		},
		incorrectJwtSecret,
		{ expiresIn: '1h' }
	);

	it('should return 401 if an invalid token is provided', async () => {
		const response = await request
			.get('/api/validate-token')
			.set('Cookie', `token=${invalidToken}`);

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message: 'Invalid token',
		});
	});
});

describe('POST /api/sign-out', () => {
	it('should logout successfully and clear the token cookie', async () => {
		const response = await request
			.post('/api/sign-out')
			.set('Cookie', `token=${validToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			message: 'Signed out successfully',
		});

		const cookies = response.headers['set-cookie'];
		expect(cookies).toBeDefined();

		let tokenCookie: string | undefined;

		if (Array.isArray(cookies)) {
			tokenCookie = cookies.find((cookie) => cookie.startsWith('token='));
		} else if (typeof cookies === 'string') {
			tokenCookie = cookies.startsWith('token=') ? cookies : undefined;
		}

		expect(tokenCookie).toBeDefined();
		expect(tokenCookie).toContain('token=;');
		expect(tokenCookie).toContain('HttpOnly');

		if (expressEnv === 'production') {
			expect(tokenCookie).toContain('Secure');
			expect(tokenCookie).toContain('SameSite=Strict');
		} else {
			expect(tokenCookie).toContain('SameSite=None');
		}
	});

	it('should fail to sign out without a token', async () => {
		const response = await request.post('/api/sign-out');

		expect(response.status).toBe(401);
		expect(response.body.message).toBe('No token provided');
	});
});

function generateRandomString(length: number = 8): string {
	return randomBytes(length).toString('hex');
}

function createTemporaryUser() {
	const timestamp = Date.now();
	return {
		name: generateRandomString(),
		email: `test_${timestamp}@example.com`,
		password: 'password123',
	};
}

const temporaryUser = createTemporaryUser();

describe('POST /api/create-account', () => {
	it('should return 400 if required fields are missing', async () => {
		const incompleteUser = { name: 'incomplete' };
		const response = await request
			.post('/api/create-account')
			.send(incompleteUser)
			.expect(400);
		expect(response.body).toHaveProperty(
			'message',
			'Missing required fields'
		);
	});

	it('should return 409 if name already exists', async () => {
		const existingUser = {
			name: 'Dan',
			email: 'dan@gmail.com',
			password: 'securePassword',
		};

		await request.post('/api/create-account').send(existingUser);

		const response = await request
			.post('/api/create-account')
			.send(existingUser)
			.expect(409);
	});
});

describe('POST /api/create-account and DELETE /api/delete-account', () => {
	let temporaryUserId;
	let temporaryUserToken;

	it('should create a new account successfully', async () => {
		const response = await request
			.post('/api/create-account')
			.send(temporaryUser)
			.expect(201);

		expect(response.body).toHaveProperty(
			'message',
			'User created successfully'
		);
		expect(response.body).toHaveProperty('userId');
		expect(response.body).toHaveProperty('name', temporaryUser.name);

		temporaryUserId = response.body.userId;
	});

	it('should sign in with the new account', async () => {
		const signInResponse = await request
			.post('/api/sign-in')
			.send({ email: temporaryUser.email, password: temporaryUser.password })
			.expect(200);

		expect(signInResponse.headers['set-cookie']).toBeDefined();
		const cookieHeader = signInResponse.headers['set-cookie'][0];
		temporaryUserToken = cookieHeader.split(';')[0].split('=')[1];
	});

	it('should delete the newly created account successfully', async () => {
		const deleteResponse = await request
			.delete('/api/delete-account')
			.set('Cookie', `token=${temporaryUserToken}`)
			.expect(200);

		expect(deleteResponse.body).toHaveProperty(
			'message',
			'Account deleted successfully'
		);
	});

	it('should return 401 if no token is provided', async () => {
		const response = await request.delete('/api/delete-account').expect(401);

		expect(response.body).toHaveProperty('message', 'No token provided');
	});

	it('should return 404 if account does not exist', async () => {
		const nonexistentUserToken = jwt.sign(
			{
				name: 'Ghost',
				userId: '123456789012345678901234',
			},
			jwtSecret,
			{ expiresIn: '1h' }
		);

		const response = await request
			.delete('/api/delete-account')
			.set('Cookie', `token=${nonexistentUserToken}`)
			.expect(404);

		expect(response.body).toHaveProperty('message', 'User not found');
	});
});
