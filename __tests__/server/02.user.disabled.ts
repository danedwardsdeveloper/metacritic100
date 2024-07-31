import { describe, it, expect } from 'vitest';
import supertest from 'supertest';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../../server/utils/environmentChecks.js';

const request = supertest(app);

describe('GET /api/all', () => {
	const createValidToken = (userId: string) => {
		return jwt.sign(
			{
				email: 'test@example.com',
				userId,
			},
			jwtSecret,
			{ expiresIn: '1h' }
		);
	};

	it('should return 401 if no token is provided', async () => {
		const response = await request.get('/api/all');
		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message', 'No token provided');
	});

	it('should return 200 and an array of 100 film objects with a valid token', async () => {
		const userId = 'testUser123';
		const validToken = createValidToken(userId);

		const response = await request
			.get('/api/all')
			.set('Cookie', `token=${validToken}`);

		expect(response.status).toBe(200);
		expect(response.body).toBeInstanceOf(Array);
		expect(response.body).toHaveLength(100);

		// Check the structure of the first film object
		const firstFilm = response.body[0];
		expect(firstFilm).toHaveProperty('filmId');
		expect(firstFilm).toHaveProperty('seen');
		expect(firstFilm).toHaveProperty('notes');

		// Ensure that the response doesn't include other properties
		expect(firstFilm).not.toHaveProperty('title');
		expect(firstFilm).not.toHaveProperty('year');
		expect(firstFilm).not.toHaveProperty('language');
		expect(firstFilm).not.toHaveProperty('description');
		expect(firstFilm).not.toHaveProperty('metascore');
		expect(firstFilm).not.toHaveProperty('rank');
	});

	it('should return user-specific data (seen and notes) for each film', async () => {
		const userId = 'testUser123';
		const validToken = createValidToken(userId);

		const response = await request
			.get('/api/all')
			.set('Cookie', `token=${validToken}`);

		expect(response.status).toBe(200);

		response.body.forEach((film: any) => {
			expect(film).toHaveProperty('filmId');
			expect(film).toHaveProperty('seen');
			expect(typeof film.seen).toBe('boolean');
			expect(film).toHaveProperty('notes');
			expect(typeof film.notes).toBe('string');
		});
	});

	it('should return 401 if an invalid token is provided', async () => {
		const invalidToken = 'invalid.token.here';
		const response = await request
			.get('/api/all')
			.set('Cookie', `token=${invalidToken}`);

		expect(response.status).toBe(401);
		expect(response.body).toHaveProperty('message', 'Invalid token');
	});
});
