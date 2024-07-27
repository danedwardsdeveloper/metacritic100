import { describe, it, beforeAll, beforeEach, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';

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
		email: 'dan@example.com',
		password: 'securePassword',
		userId: 1,
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

	it('should login successfully with correct credentials', async () => {
		const response = await request
			.post('/api/sign-in')
			.send({ email: 'dan@gmail.com', password: 'securePassword' })
			.expect('Content-Type', /json/)
			.expect(200);

		expect(response.body).toHaveProperty('message', 'Login successful');
		expect(response.headers['set-cookie']).toBeDefined();
	});
});

describe('GET /api/validate-token', () => {
	it('should return 200 if a valid token is provided', async () => {
		const response = await request
			.get('/api/validate-token')
			.set('Cookie', `token=${validToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toEqual({
			userId: 1,
		});
	});

	it(`should return 'No token provided' if no token is provided`, async () => {
		const response = await request.get('/api/validate-token');

		expect(response.status).toBe(401);
		expect(response.body).toEqual({
			message: 'No token provided',
		});
	});

	const incorrectJwtSecret = 'abcdefg123456789';

	const invalidToken = jwt.sign(
		{
			email: 'dan@example.com',
			password: 'securePassword',
			userId: 1,
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
