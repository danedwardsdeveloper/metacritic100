// FilmGrid.tsx
import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard.tsx';
import { useUser } from '../contexts/UserContext.tsx';
import { filmsData, Film } from '../data/filmsData.ts';

export default function FilmGrid(): React.ReactElement {
	const { isLoading } = useUser();
	const [columns, setColumns] = useState(1);

	useEffect(() => {
		const updateColumns = () => {
			if (window.innerWidth >= 1024) setColumns(4);
			else if (window.innerWidth >= 768) setColumns(3);
			else if (window.innerWidth >= 640) setColumns(2);
			else setColumns(1);
		};

		updateColumns();
		window.addEventListener('resize', updateColumns);
		return () => window.removeEventListener('resize', updateColumns);
	}, []);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const columnContents: Film[][] = Array.from({ length: columns }, () => []);
	filmsData.forEach((film, index) => {
		columnContents[index % columns].push(film);
	});

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 m-4 sm:m-6">
			{columnContents.map((columnFilms, columnIndex) => (
				<div key={columnIndex} className="col">
					{columnFilms.map((film) => (
						<FilmCard key={film.filmId} film={film} />
					))}
				</div>
			))}
		</div>
	);
}
