import { Film, IFilm } from '../models/Film';
import { User } from '../models/User';

export async function addFilm(filmData: Partial<IFilm>): Promise<void> {
	const film = new Film(filmData);
	await film.save();

	await User.updateMany(
		{},
		{ $addToSet: { films: { filmId: film.filmId, seen: false, notes: '' } } }
	);
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
