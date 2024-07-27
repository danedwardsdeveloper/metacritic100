import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

import { jwtSecret, expressEnv } from '../../utils/environmentChecks.js';
import { User } from '../models/User.js';

const publicRouter = express.Router();

publicRouter.get('/', (req: Request, res: Response) => {
	res.json({ message: 'MetaCritic100 API' });
});

publicRouter.post('/create-account', async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	try {
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			name,
			email,
			password: hashedPassword,
			films: [],
		});

		await newUser.save();

		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		console.error('Sign-up error:', error);
		res.status(500).json({ message: 'An error occurred during sign-up' });
	}
});

publicRouter.delete('/delete-account', async (req: Request, res: Response) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
		const userId = decoded.userId;

		const deletedUser = await User.findByIdAndDelete(userId);

		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.clearCookie('token', {
			httpOnly: true,
			secure: true,
			sameSite: expressEnv === 'production' ? 'strict' : 'none',
			path: '/',
		});

		res.status(200).json({ message: 'Account deleted successfully' });
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({ message: 'Invalid token' });
		} else if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({ message: 'Expired token' });
		} else {
			console.error('Error deleting account:', error);
			res.status(500).json({
				message: 'An error occurred while deleting the account',
			});
		}
	}
});

publicRouter.post('/sign-in', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const token = jwt.sign({ userId: user._id }, jwtSecret, {
			expiresIn: '1h',
		});

		const inProduction: boolean = expressEnv === 'production';

		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
			sameSite: inProduction ? 'strict' : 'none',
			maxAge: 60 * 60 * 1000,
			path: '/',
		});

		res.json({
			message: 'Signed in successfully',
			userId: user._id,
			name: user.name,
		});
	} catch (error) {
		console.error('Sign-in error:', error);
		res.status(500).json({ message: 'An error occurred during sign-in' });
	}
});

publicRouter.get('/validate-token', (req: Request, res: Response) => {
	const token = req.cookies.token;

	if (!token) {
		return res.status(401).json({
			message: 'No token provided',
		});
	}

	try {
		const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;
		res.json({
			userId: decoded.userId,
		});
	} catch (error) {
		if (error instanceof jwt.JsonWebTokenError) {
			return res.status(401).json({
				message: 'Invalid token',
			});
		} else if (error instanceof jwt.TokenExpiredError) {
			return res.status(401).json({
				message: 'Expired token',
			});
		} else {
			console.error('Unexpected error during token validation:', error);
			return res.status(500).json({
				message: 'Unexpected error',
			});
		}
	}
});

export default publicRouter;
