import React from 'react';
import { useFilms } from '../contexts/FilmsContext';
import FilmCard from './FilmCard';

export default function FilmsList(): React.ReactElement {
	const { filmsData, isLoading } = useFilms();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="pt-6 px-4">
			{filmsData.map((film) => (
				<FilmCard key={film.filmId} film={film} />
			))}
		</div>
	);
}
