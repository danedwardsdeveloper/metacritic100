import React from 'react';
import FilmCard from './FilmCard';
import { useUser } from '../contexts/UserContext.tsx';
import { filmsData } from '../data/filmsData.ts';

export default function FilmsList(): React.ReactElement {
	const { films: seenFilms, isLoading } = useUser();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
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
