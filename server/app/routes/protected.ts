import express, { Request, Response } from 'express';

import { expressEnv } from '../../utils/environmentChecks.js';
import { verifyToken } from '../middleware/verifyToken.js';
import { syncUserFilms } from '../services/filmService.js';
import { updateUserFilm, getUserFilms } from '../services/userService';

interface CustomRequest extends Request {
	userId?: string;
}

const protectedRouter = express.Router();
protectedRouter.use(verifyToken);

protectedRouter.get('/protected', (req: CustomRequest, res: Response) => {
	res.json({ message: 'This is a protected route', userId: req.userId });
});

protectedRouter.get(
	'/all',
	verifyToken,
	async (req: CustomRequest, res: Response) => {
		try {
			const userId = req.userId;

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
	verifyToken,
	async (req: CustomRequest, res: Response) => {
		try {
			const userId = req.userId;
			const { filmId, seen } = req.body;

			if (!userId) {
				return res.status(401).json({ error: 'User not authenticated' });
			}

			if (typeof filmId !== 'string' || typeof seen !== 'boolean') {
				return res.status(400).json({ error: 'Invalid request body' });
			}

			await syncUserFilms(userId, filmId, seen);

			res.status(200).json({
				message: 'Film seen status updated successfully',
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

export default protectedRouter;
