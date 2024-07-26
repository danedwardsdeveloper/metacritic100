import { describe, it, before, beforeEach } from 'node:test';
import assert from 'node:assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server/app/app.js';
import jwt from 'jsonwebtoken';

chai.use(chaiHttp);
const { expect } = chai;

describe('API', () => {
	it('should return 200 on /', (done) => {
		chai
			.request(app)
			.get('/')
			.end((err, res) => {
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('API Tests', () => {
	const jwtSecret = process.env.EXPRESS_JWT_SECRET;
	let validToken;

	before(() => {
		validToken = jwt.sign(
			{
				email: 'wronguser@gmail.com',
				password: 'securePassword',
				userId: 1,
			},
			jwtSecret,
			{
				expiresIn: '1h',
			}
		);
	});

	describe('GET /api', () => {
		it('should return JSON with "Express React Monorepo API"', (done) => {
			request(app)
				.get('/api')
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Express React Monorepo API'
					);
					done();
				});
		});
	});

	describe('POST /api/sign-in', () => {
		it('should login successfully with correct credentials', (done) => {
			request(app)
				.post('/api/sign-in')
				.send({ email: 'user@gmail.com', password: 'securePassword' })
				.expect('Content-Type', /json/)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property('message', 'Login successful');
					expect(res).to.have.cookie('token');
					done();
				});
		});

		it('should fail login with incorrect email', (done) => {
			request(app)
				.post('/api/sign-in')
				.send({ email: 'wronguser@gmail.com', password: 'securePassword' })
				.expect('Content-Type', /json/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Invalid credentials'
					);
					expect(res).to.not.have.cookie('token');
					done();
				});
		});

		it('should fail login with incorrect password', (done) => {
			request(app)
				.post('/api/sign-in')
				.send({ email: 'user@gmail.com', password: 'wrongPassword' })
				.expect('Content-Type', /json/)
				.expect(401)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body).to.have.property(
						'message',
						'Invalid credentials'
					);
					expect(res).to.not.have.cookie('token');
					done();
				});
		});
	});

	describe('Protected Routes', () => {
		beforeEach((done) => {
			request(app)
				.get('/clear-cookies')
				.end((err, res) => {
					done();
				});
		});

		it('should deny access without token', (done) => {
			request(app)
				.get('/api/protected')
				.end((err, res) => {
					expect(res).to.have.status(401);
					expect(res).to.be.json;
					expect(res.body).to.have.property(
						'message',
						'No token provided'
					);
					done();
				});
		});

		it('should deny access with invalid token', (done) => {
			request(app)
				.get('/api/protected')
				.set('Cookie', 'token=invalidToken')
				.end((err, res) => {
					expect(res).to.have.status(401);
					expect(res).to.be.json;
					expect(res.body).to.have.property('message', 'Invalid token');
					done();
				});
		});

		it('should access protected route with valid token', (done) => {
			request(app)
				.get('/api/protected')
				.set('Cookie', `token=${validToken}`)
				.end((err, res) => {
					console.log('Response body:', res.body);
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.have.property(
						'message',
						'This is a protected route'
					);
					expect(res.body).to.have.property('userId', 1);
					done();
				});
		});
	});

	describe('POST /api/sign-out', () => {
		it('should logout successfully and clear the token cookie', (done) => {
			request(app)
				.post('/api/sign-out')
				.set('Cookie', `token=${validToken}`)
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.have.property(
						'message',
						'Logged out successfully'
					);

					// Check if the cookie is cleared
					const cookies = res.headers['set-cookie'];
					expect(cookies).to.be.an('array');
					const tokenCookie = cookies.find((cookie) =>
						cookie.startsWith('token=')
					);
					expect(tokenCookie).to.include('token=;');
					expect(tokenCookie).to.include('HttpOnly');

					if (process.env.VITE_REACT_ENV === 'production') {
						expect(tokenCookie).to.include('Secure');
						expect(tokenCookie).to.include('SameSite=Strict');
					} else {
						expect(tokenCookie).to.include('SameSite=None');
					}

					done();
				});
		});

		it('should return 200 even if not logged in', (done) => {
			request(app)
				.post('/api/sign-out')
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					expect(res).to.be.json;
					expect(res.body).to.have.property(
						'message',
						'Logged out successfully'
					);
					done();
				});
		});
	});
});
