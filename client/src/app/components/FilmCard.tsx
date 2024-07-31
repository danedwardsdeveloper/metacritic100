import React from 'react';
import { Film } from '../data/filmsData';
import { useUser } from '../contexts/UserContext.tsx';

interface FilmCardProps {
	film: Film;
}

const FilmCard: React.FC<FilmCardProps> = ({ film }) => {
	const { films: seenFilms, toggleFilm } = useUser();
	const seen = seenFilms[film.filmId] || false;

	const handleToggle = () => {
		toggleFilm(film.filmId);
	};

	const cardBackgroundColor = seen ? 'bg-green-50' : 'bg-slate-50';

	return (
		<div
			className={`rounded-lg ${cardBackgroundColor} shadow p-5 col-span-1 h-min mb-4 sm:mb-6 transition-colors duration-300`}
		>
			<div className="flex justify-between align-top mb-1">
				<h3 className="font-bold text-xl">{film.title}</h3>
				<div className="flex items-start">
					<span className="font-bold text-2xl mr-3 leading-none">
						{film.rank}
					</span>
					<input
						type="checkbox"
						id={film.filmId}
						className="bg-slate-100 hover:bg-slate-200 rounded-sm focus:ring-green-500 text-green-500 hover:text-green-600 h-6 w-6"
						checked={seen}
						onChange={handleToggle}
					/>
				</div>
			</div>
			<p className="text-gray-600 mb-2">
				{film.year}, {film.language}
			</p>
			<p className=" text-justify">{film.description}</p>
		</div>
	);
};

export default FilmCard;
