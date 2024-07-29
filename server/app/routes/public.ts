import express, { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';

import User, { IUser } from '../models/User.js';
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

			const token = generateToken(newUser._id, newUser.name);
			setToken(res, token);

			res.status(201).json({
				name: newUser.name,
				_id: newUser._id,
				message: 'User created successfully',
			});
		} catch (error) {
			next(error);
		}
	}
);

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
			films: cleanedFilms,
		});
	} catch (error) {
		console.error('Sign-in error:', error);
		res.status(500).json({ message: 'An error occurred during sign-in' });
	}
});

publicRouter.get(
	'/validate-token',
	validateToken,
	(req: AuthenticatedRequest, res: Response) => {
		const name = req.user?.name ?? null;
		const _id = req.user?._id ?? null;

		if (name && _id) {
			res.status(200).json({ name, _id });
		} else {
			res.status(401).json({ message: 'User not authenticated' });
		}
	}
);

export default publicRouter;
