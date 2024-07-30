import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import User from '../models/User.js';
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

// Removes unnecessary MongoDB '_id' and 'id' keys from films array
function cleanFilmObject(film: any) {
	const { filmId, seen } = film;
	return { filmId, seen };
}

publicRouter.post('/sign-in', async (req: Request, res: Response) => {
	const { email, password, films } = req.body;

	if (!email || !password) {
		return res
			.status(400)
			.json({ message: 'Email and password are required' });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}

		if (Array.isArray(films)) {
			films.forEach((clientFilm) => {
				if (clientFilm.seen) {
					const dbFilm = user.films.find(
						(f) => f.filmId === clientFilm.filmId
					);
					if (dbFilm) {
						dbFilm.seen = true;
					} else {
						user.films.push({ filmId: clientFilm.filmId, seen: true });
					}
				}
			});

			await user.save();
		}

		const token = generateToken(user.userId, user.name);
		setToken(res, token);

		const cleanedFilms = user.films.map(cleanFilmObject);

		const filmsSeen = cleanedFilms.filter((film) => film.seen).length;

		res.json({
			message: 'Signed in successfully',
			name: user.name,
			userId: user.userId,
			filmsSeen: filmsSeen,
			films: cleanedFilms,
		});
	} catch (error) {
		console.error('Sign-in error:', error);
		res.status(500).json({ message: 'An error occurred during sign-in' });
	}
});

publicRouter.post(
	'/validate-token',
	validateToken,
	async (req: AuthenticatedRequest, res: Response) => {
		const userId = req.user?.userId;
		const name = req.user?.name;
		const { films } = req.body;

		if (!userId || !name) {
			return res.status(401).json({ message: 'User not authenticated' });
		}

		try {
			const user = await User.findById(userId);

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			if (Array.isArray(films)) {
				films.forEach((clientFilm) => {
					if (clientFilm.seen) {
						const dbFilm = user.films.find(
							(f) => f.filmId === clientFilm.filmId
						);
						if (dbFilm) {
							dbFilm.seen = true;
						} else {
							user.films.push({ filmId: clientFilm.filmId, seen: true });
						}
					}
				});

				await user.save();
			}

			const cleanedFilms = user.films.map(cleanFilmObject);

			res.json({
				message: 'Token validated successfully',
				name: user.name,
				userId: user.userId,
				films: cleanedFilms,
			});
		} catch (error) {
			console.error('Token validation error:', error);
			res.status(500).json({
				message: 'An error occurred during token validation',
			});
		}
	}
);

export default publicRouter;
