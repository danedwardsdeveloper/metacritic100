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
			<p>{film.description}</p>
			<label>
				<input
					type="checkbox"
					checked={seenFilms[film.filmId] || false}
					onChange={handleToggle}
				/>
				Seen
			</label>
		</div>
	);
};
