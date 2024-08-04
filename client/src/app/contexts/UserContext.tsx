import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

import {
	validateTokenService,
	toggleFilmService,
} from '../services/UserService';
import { filmsData } from '../data/filmsData';
import type { Film, UserContextType } from '../../types';

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultFilms = Object.fromEntries(
	filmsData.map((film) => [film.filmId, false])
);

const calculateTotalFilms = (films: Record<string, boolean>): number => {
	return Object.values(films).filter(Boolean).length;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState('');
	const [initial, setInitial] = useState('?');
	const [films, setFilms] = useState<Record<string, boolean>>(defaultFilms);
	const [filmsSeen, setFilmsSeen] = useState(0);

	useEffect(() => {
		const initializeUser = async () => {
			setIsLoading(true);
			try {
				const filmsArray: Film[] = Object.entries(films).map(
					([filmId, seen]) => ({ filmId, seen })
				);
				const validationResult = await validateTokenService(filmsArray);

				if (validationResult) {
					setIsAuthenticated(true);
					setInitial(validationResult.initial);
					setUserId(validationResult.userId);

					const mergedFilms = Object.fromEntries(
						validationResult.films.map((film) => [
							film.filmId,
							films[film.filmId] || film.seen,
						])
					);

					setFilms(mergedFilms);
				} else {
					// console.log('Token validation failed');
					setIsAuthenticated(false);
				}
			} catch (error) {
				// console.error('Error initializing user:', error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		initializeUser();
	}, []);

	useEffect(() => {
		setFilmsSeen(calculateTotalFilms(films));
	}, [films]);

	const toggleFilm = async (filmId: string) => {
		const currentStatus = films[filmId];

		setFilms((prev) => {
			const updated = { ...prev, [filmId]: !currentStatus };
			updateLocalStorage(initial, userId, updated);
			setFilmsSeen(calculateTotalFilms(updated));
			return updated;
		});

		if (isAuthenticated) {
			const result = await toggleFilmService(filmId, !currentStatus);
			if (result) {
				setFilms((prev) => {
					const updated = { ...prev, [filmId]: result.newStatus };
					updateLocalStorage(initial, userId, updated);
					return updated;
				});
			} else {
				console.error('Failed to toggle film on server');
				setFilms((prev) => {
					const updated = { ...prev, [filmId]: currentStatus };
					updateLocalStorage(initial, userId, updated);
					return updated;
				});
			}
		}
	};

	const updateLocalStorage = (
		name: string,
		userId: string,
		films: Record<string, boolean>
	) => {
		localStorage.setItem('user', JSON.stringify({ name, userId, films }));
	};

	const syncWithDatabase = async () => {
		try {
			const filmsArray: Film[] = Object.entries(films).map(
				([filmId, seen]) => ({ filmId, seen })
			);
			const validationResult = await validateTokenService(filmsArray);
			if (validationResult) {
				setIsAuthenticated(true);
				setInitial(validationResult.initial);
				setUserId(validationResult.userId);

				const updatedFilms = Object.fromEntries(
					validationResult.films.map((film) => [film.filmId, film.seen])
				);
				setFilms(updatedFilms);
				setFilmsSeen(calculateTotalFilms(updatedFilms));
			}
		} catch (error) {
			console.error('Error syncing with database:', error);
		}
	};

	const resetUser = () => {
		setIsAuthenticated(false);
		setUserId('');
		setInitial('');
		setFilms(defaultFilms);
		setFilmsSeen(0);
		localStorage.setItem(
			'user',
			JSON.stringify({ name: '', userId: '', films: defaultFilms })
		);
	};

	const value: UserContextType = {
		isLoading,
		isAuthenticated,
		userId,
		initial,
		films,
		filmsSeen,
		syncWithDatabase,
		setUserId,
		setInitial,
		setIsAuthenticated,
		toggleFilm,
		resetUser,
	};

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
