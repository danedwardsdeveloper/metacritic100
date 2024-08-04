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

	const cardBackgroundColours = {
		unseen: 'bg-slate-100 dark:bg-slate-800',
		seen: 'bg-green-100 dark:bg-teal-900',
	};

	const cardBackgroundColor = seen
		? cardBackgroundColours.seen
		: cardBackgroundColours.unseen;

	return (
		<div
			className={`rounded-lg ${cardBackgroundColor}  shadow p-5 col-span-1 h-min mb-4 sm:mb-6 transition-colors duration-300`}
		>
			<div className="flex justify-between align-top mb-1">
				<h2 className="font-bold text-xl dark:text-slate-200">
					{film.title}
				</h2>
				<div className="flex items-start">
					<span className="font-bold text-2xl mr-3 leading-none dark:text-slate-200">
						{film.rank}
					</span>
					<input
						type="checkbox"
						id={film.filmId}
						className="bg-slate-100 dark:bg-slate-600 hover:bg-slate-200 rounded-sm focus:ring-green-500 text-green-500 hover:text-green-600 h-6 w-6"
						checked={seen}
						onChange={handleToggle}
					/>
				</div>
			</div>
			<p className="text-gray-600 dark:text-gray-400 mb-2">
				{film.year}, {film.language}
			</p>
			<p className=" text-justify dark:text-slate-300">{film.description}</p>
		</div>
	);
};

export default FilmCard;
