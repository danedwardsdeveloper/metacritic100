import express, { Request, Response, NextFunction } from 'express';

import { expressEnv } from '../../utils/environmentChecks.js';
import {
	validateToken,
	clearToken,
} from '../middleware/components/authTokens.js';
import { updateUserFilm } from '../services/userService.js';
import User from '../models/User.js';
import { AuthenticatedRequest } from '../models/AuthenticatedRequest.js';

const protectedRouter = express.Router();
protectedRouter.use(validateToken);

protectedRouter.post(
	'/toggle-film',
	async (req: AuthenticatedRequest, res: Response) => {
		try {
			const userId = req.user?.userId;
			const { filmId, seen } = req.body;

			if (!userId) {
				return res.status(401).json({ error: 'User not authenticated' });
			}

			if (typeof filmId !== 'string' || filmId.trim() === '') {
				return res.status(400).json({ error: 'Invalid or missing filmId' });
			}

			if (typeof seen !== 'boolean') {
				return res
					.status(400)
					.json({ error: 'Invalid or missing seen status' });
			}

			const result = await updateUserFilm(userId, filmId, seen);

			if (result.success) {
				res.status(200).json({
					message: result.message,
					filmId: filmId,
					newStatus: result.newStatus,
				});
			} else {
				res.status(404).json({ error: result.message });
			}
		} catch (error) {
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
