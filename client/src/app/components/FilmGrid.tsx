import React from 'react';
import FilmCard from './FilmCard.tsx';
import { useUser } from '../contexts/UserContext.tsx';
import { filmsData } from '../data/filmsData.ts';

export default function FilmsList(): React.ReactElement {
	const { films: seenFilms, isLoading } = useUser();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 m-4 sm:m-6">
			{filmsData.map((film) => (
				<FilmCard
					key={film.filmId}
					film={film}
					seen={seenFilms[film.filmId] || false}
				/>
			))}
		</div>
	);
}
