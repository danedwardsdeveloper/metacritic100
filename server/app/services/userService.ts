import { User, IUserFilm } from '../models/User.js';
import { Film, IFilm } from '../models/Film.js';

export async function updateUserFilm(
	userId: string,
	filmId: string,
	seen: boolean,
	notes: string
): Promise<void> {
	await User.updateOne(
		{ userId, 'films.filmId': filmId },
		{
			$set: {
				'films.$.seen': seen,
				'films.$.notes': notes,
			},
		}
	);
}

export async function getUserFilms(
	userId: string
): Promise<(IFilm & IUserFilm)[]> {
	const user = await User.findOne({ userId });
	if (!user) throw new Error('User not found');

	const filmIds = user.films.map((f) => f.filmId);
	const films = await Film.find({ filmId: { $in: filmIds } });

	return user.films.map((userFilm) => {
		const filmDetails = films.find((f) => f.filmId === userFilm.filmId);
		if (!filmDetails)
			throw new Error(
				`Film details not found for filmId: ${userFilm.filmId}`
			);
		return {
			...(filmDetails.toObject() as IFilm),
			seen: userFilm.seen,
			notes: userFilm.notes,
		} as IFilm & IUserFilm;
	});
}
