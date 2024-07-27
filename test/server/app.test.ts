import { describe, it, beforeAll, beforeEach, expect } from 'vitest';
// import { createServer } from 'http';
// import { AddressInfo } from 'net';
import supertest from 'supertest';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';

const request = supertest(app);

describe('Welcome message', () => {
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

describe('API Tests', () => {
  const jwtSecret = process.env.EXPRESS_JWT_SECRET;
  let validToken: string;

  beforeAll(() => {
    validToken = jwt.sign(
      {
        email: 'wronguser@gmail.com',
        password: 'securePassword',
        userId: 1,
      },
      jwtSecret!,
      {
        expiresIn: '1h',
      }
    );
  });

  describe('POST /api/sign-in', () => {
    it('should login successfully with correct credentials', async () => {
      const response = await request
        .post('/api/sign-in')
        .send({ email: 'user@gmail.com', password: 'securePassword' })
        .expect('Content-Type', /json/)
        .expect(200);

      expect(response.body).toHaveProperty('message', 'Login successful');
      expect(response.headers['set-cookie']).toBeDefined();
    });

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
  });

  describe('Protected Routes', () => {
    beforeEach(async () => {
      await request.get('/clear-cookies');
    });

    it('should deny access without token', async () => {
      const response = await request.get('/api/protected');
      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'No token provided');
    });

    it('should deny access with invalid token', async () => {
      const response = await request
        .get('/api/protected')
        .set('Cookie', 'token=invalidToken');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Invalid token');
    });

    it('should access protected route with valid token', async () => {
      const response = await request
        .get('/api/protected')
        .set('Cookie', `token=${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'This is a protected route');
      expect(response.body).toHaveProperty('userId', 1);
    });
  });

  describe('POST /api/sign-out', () => {
    it('should logout successfully and clear the token cookie', async () => {
      const response = await request
        .post('/api/sign-out')
        .set('Cookie', `token=${validToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logged out successfully');

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

      if (process.env.VITE_REACT_ENV === 'production') {
        expect(tokenCookie).toContain('Secure');
        expect(tokenCookie).toContain('SameSite=Strict');
      } else {
        expect(tokenCookie).toContain('SameSite=None');
      }
    });

    it('should return 200 even if not logged in', async () => {
      const response = await request.post('/api/sign-out');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'Logged out successfully');
    });
  });
});