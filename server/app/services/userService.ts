import User from '../models/User.js';

export async function updateUserFilm(
	userId: string,
	filmId: string,
	seen: boolean
): Promise<{ success: boolean; newStatus?: boolean; message?: string }> {
	try {
		const user = await User.findOne({ _id: userId, 'films.filmId': filmId });

		if (!user) {
			return { success: false, message: 'User or film not found' };
		}

		const film = user.films.find((f) => f.filmId === filmId);

		if (!film) {
			return { success: false, message: "Film not found in user's list" };
		}

		if (film.seen === seen) {
			return {
				success: true,
				newStatus: seen,
				message: 'Film status unchanged',
			};
		}

		const result = await User.updateOne(
			{ _id: userId, 'films.filmId': filmId },
			{
				$set: {
					'films.$.seen': seen,
				},
			}
		);

		if (result.modifiedCount === 1) {
			return {
				success: true,
				newStatus: seen,
				message: 'Film status updated',
			};
		} else {
			return { success: false, message: 'Update operation failed' };
		}
	} catch (error) {
		return { success: false, message: 'Internal server error' };
	}
}
