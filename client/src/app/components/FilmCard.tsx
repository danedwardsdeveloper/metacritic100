import React from 'react';
import { Film } from '../data/filmsData.ts';
import { useFilms } from '../contexts/FilmsContext';

interface FilmCardProps {
	film: Film;
}

export default ({ film }: FilmCardProps): React.ReactElement => {
	const { seenFilms, toggleFilmSeen } = useFilms();

	const handleToggle = () => {
		toggleFilmSeen(film.filmId);
	};

	return (
		<div className="bg-slate-300 rounded-md m-4 p-5">
			<h3 className="font-bold">{film.title}</h3>
			<p>{film.year}</p>
			<p>{film.language}</p>
			<p>{film.description}</p>
			<label htmlFor={film.filmId}>
				<input
					type="checkbox"
					id={film.filmId}
					className="bg-slate-100 hover:bg-slate-200 rounded-sm focus:ring-green-500 text-green-500 hover:text-green-600 h-5 w-5"
					checked={seenFilms[film.filmId] || false}
					onChange={handleToggle}
				/>
				&nbsp; Seen
			</label>
		</div>
	);
};
