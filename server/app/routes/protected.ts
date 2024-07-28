import express, { Request, Response, NextFunction } from 'express';

import { expressEnv } from '../../utils/environmentChecks.js';
import {
	validateToken,
	clearToken,
} from '../middleware/components/authTokens.js';
import { syncUserFilms, toggleFilm } from '../services/filmService.js';
import { updateUserFilm, getUserFilms } from '../services/userService';
import { User } from '../models/User.js';
import { AuthenticatedRequest } from '../models/AuthenticatedRequest.js';

const protectedRouter = express.Router();
protectedRouter.use(validateToken);

protectedRouter.get(
	'/protected',
	(req: AuthenticatedRequest, res: Response) => {
		res.json({
			name: req.user?.name,
			userId: req.user?.userId,
			message: 'This is a protected route',
		});
	}
);

protectedRouter.get(
	'/all',
	async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userId = req.user?.userId;

			if (!userId) {
				return res.status(400).json({ error: 'User ID is required' });
			}

			const userFilms = await getUserFilms(userId);
			res.json(userFilms);
		} catch (error) {
			console.error('Error fetching user films:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

protectedRouter.post(
	'/toggle-film',
	async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userId = req.user?.userId;
			console.log(`User ID: ${userId}`);
			const { filmId } = req.body;

			if (!userId) {
				return res.status(401).json({ error: 'User not authenticated' });
			}

			if (typeof filmId !== 'string') {
				return res.status(400).json({ error: 'Invalid request body' });
			}

			await toggleFilm(userId, filmId);

			res.status(200).json({
				message: 'Film seen status toggled successfully',
			});
		} catch (error) {
			console.error('Error toggling film seen status:', error);
			res.status(500).json({ error: 'Internal server error' });
		}
	}
);

protectedRouter.post('/sign-out', (req: Request, res: Response) => {
	res.clearCookie('token', {
		httpOnly: true,
		secure: true,
		sameSite: expressEnv === 'production' ? 'strict' : 'none',
	});
	res.status(200).json({ message: 'Signed out successfully' });
});

protectedRouter.delete(
	'/delete-account',
	async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.userId;

			if (!userId) {
				return res.status(401).json({ error: 'User not authenticated' });
			}

			const deletedUser = await User.findOneAndDelete({ userId: userId });

			if (!deletedUser) {
				return res.status(404).json({ message: 'User not found' });
			}

			clearToken(res);
			res.status(200).json({ message: 'Account deleted successfully' });
		} catch (error) {
			next(error);
		}
	}
);

export default protectedRouter;
