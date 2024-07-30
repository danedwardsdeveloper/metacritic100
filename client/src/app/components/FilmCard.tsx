import React from 'react';
import { Film } from '../data/filmsData';
import { useUser } from '../contexts/UserContext.tsx';

interface FilmCardProps {
	film: Film;
	seen: boolean;
}

const FilmCard: React.FC<FilmCardProps> = ({ film, seen }) => {
	const { toggleFilm } = useUser();

	const handleToggle = () => {
		toggleFilm(film.filmId);
	};

	return (
		<div className=" rounded-lg bg-slate-50 shadow p-5 col-span-1">
			<h3 className="font-bold">{film.title}</h3>
			<p>{film.year}</p>
			<p>{film.language}</p>
			<p>{film.description}</p>
			<label htmlFor={film.filmId}>
				<input
					type="checkbox"
					id={film.filmId}
					className="bg-slate-100 hover:bg-slate-200 rounded-sm focus:ring-green-500 text-green-500 hover:text-green-600 h-5 w-5"
					checked={seen}
					onChange={handleToggle}
				/>
				&nbsp; Seen
			</label>
		</div>
	);
};

export default FilmCard;
