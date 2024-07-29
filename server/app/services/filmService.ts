import Film from '../models/Film.js';
import User from '../models/User.js';

export async function toggleFilm(userId: string, filmId: string) {
	try {
		const user = await User.findOne({ userId });
		if (!user) {
			throw new Error('User not found');
		}

		const filmIndex = user.films.findIndex((film) => film.filmId === filmId);

		if (filmIndex === -1) {
			user.films.push({ filmId, seen: true, notes: '' });
			await user.save();
			return { success: true, newStatus: true };
		} else {
			user.films[filmIndex].seen = !user.films[filmIndex].seen;
			await user.save();
			return { success: true, newStatus: user.films[filmIndex].seen };
		}
	} catch (error) {
		console.error('Error in toggleFilm:', error);
		return { success: false };
	}
}

export async function syncUserFilms(
	userId: string,
	filmId: string,
	seen: boolean
): Promise<void> {
	const user = await User.findOne({ userId });
	if (!user) {
		throw new Error('User not found');
	}

	const existingFilm = user.films.find((film) => film.filmId === filmId);
	if (existingFilm) {
		existingFilm.seen = seen;
	} else {
		user.films.push({ filmId, seen, notes: '' });
	}

	await user.save();
}
