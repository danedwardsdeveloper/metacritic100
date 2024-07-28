import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import { User } from '../models/User.js';
import { AuthenticatedRequest } from '../models/AuthenticatedRequest.js';
import {
	generateToken,
	setToken,
	validateToken,
} from '../middleware/components/authTokens.js';

const publicRouter = express.Router();

publicRouter.get('/', (req: Request, res: Response) => {
	res.json({ message: 'MetaCritic100 API' });
});

publicRouter.post(
	'/create-account',
	async (req: Request, res: Response, next: NextFunction) => {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: 'Missing required fields' });
		}

		try {
			const existingUser = await User.findOne({ email });
			if (existingUser) {
				return res.status(409).json({ message: 'User already exists' });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = new User({
				name,
				email,
				password: hashedPassword,
				films: [],
			});

			await newUser.save();

			const token = generateToken(newUser.userId, newUser.name);
			setToken(res, token);

			res.status(201).json({
				name: newUser.name,
				userId: newUser.userId,
				message: 'User created successfully',
			});
		} catch (error) {
			next(error);
		}
	}
);

publicRouter.post(
	'/sign-in',
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;

		try {
			const user = await User.findOne({ email });

			if (!user || !(await bcrypt.compare(password, user.password))) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			const token = generateToken(user.userId, user.name);
			setToken(res, token);

			res.json({
				name: user.name,
				userId: user.userId,
				message: 'Signed in successfully',
			});
		} catch (error) {
			next(error);
		}
	}
);

publicRouter.get(
	'/validate-token',
	validateToken,
	(req: AuthenticatedRequest, res: Response) => {
		const name = req.user?.name ?? null;
		const userId = req.user?.userId ?? null;

		if (name && userId) {
			res.status(200).json({ name, userId });
		} else {
			res.status(401).json({ message: 'User not authenticated' });
		}
	}
);

export default publicRouter;
