import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

import {
	Film,
	validateTokenService,
	toggleFilmService,
} from '../services/UserService';
import { filmsData } from '../data/filmsData';

interface UserContextType {
	isLoading: boolean;
	isAuthenticated: boolean;
	userId: string;
	name: string;
	userInitial: string;
	films: Record<string, boolean>;
	totalFilms: number;
	setIsAuthenticated: (value: boolean) => void;
	setName: (name: string) => void;
	setUserId: (userId: string) => void;
	toggleFilm: (filmId: string) => void;
	syncWithDatabase: () => Promise<void>;
	resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultFilms = Object.fromEntries(
	filmsData.map((film) => [film.filmId, false])
);

const calculateTotalFilms = (films: Record<string, boolean>): number => {
	return Object.values(films).filter(Boolean).length;
};

const getUserInitial = (name: string): string => {
	return name ? name.charAt(0).toUpperCase() : '';
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userId, setUserId] = useState('');
	const [name, setName] = useState('');
	const [userInitial, setUserInitial] = useState('');
	const [films, setFilms] = useState<Record<string, boolean>>(defaultFilms);
	const [totalFilms, setTotalFilms] = useState(0);

	useEffect(() => {
		const initializeUser = async () => {
			setIsLoading(true);
			try {
				const storedUser = localStorage.getItem('user');
				if (storedUser) {
					const { name, userId, films } = JSON.parse(storedUser);
					setName(name);
					setUserId(userId);
					setFilms(films);
					setUserInitial(getUserInitial(name));
				} else {
					localStorage.setItem(
						'user',
						JSON.stringify({ name: '', userId: '', films: defaultFilms })
					);
				}

				const hasToken = document.cookie
					.split(';')
					.some((item) => item.trim().startsWith('token='));

				if (hasToken) {
					const filmsArray: Film[] = Object.entries(films).map(
						([filmId, seen]) => ({ filmId, seen })
					);
					const validationResult = await validateTokenService(filmsArray);

					if (validationResult) {
						setIsAuthenticated(true);
						setName(validationResult.name);
						setUserId(validationResult.userId);
						setUserInitial(getUserInitial(validationResult.name));

						const mergedFilms = Object.fromEntries(
							validationResult.films.map((film) => [
								film.filmId,
								films[film.filmId] || film.seen,
							])
						);

						setFilms(mergedFilms);
						updateLocalStorage(
							validationResult.name,
							validationResult.userId,
							mergedFilms
						);
					} else {
						setIsAuthenticated(false);
					}
				} else {
					setIsAuthenticated(false);
				}
			} catch (error) {
				console.error('Error initializing user:', error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};

		initializeUser();
	}, []);

	useEffect(() => {
		setTotalFilms(calculateTotalFilms(films));
	}, [films]);

	const toggleFilm = async (filmId: string) => {
		const currentStatus = films[filmId];

		setFilms((prev) => {
			const updated = { ...prev, [filmId]: !currentStatus };
			updateLocalStorage(name, userId, updated);
			setTotalFilms(calculateTotalFilms(updated));
			return updated;
		});

		if (isAuthenticated) {
			const result = await toggleFilmService(filmId, !currentStatus);
			if (result) {
				setFilms((prev) => {
					const updated = { ...prev, [filmId]: result.newStatus };
					updateLocalStorage(name, userId, updated);
					return updated;
				});
			} else {
				console.error('Failed to toggle film on server');
				setFilms((prev) => {
					const updated = { ...prev, [filmId]: currentStatus };
					updateLocalStorage(name, userId, updated);
					return updated;
				});
			}
		}
	};

	const syncWithDatabase = async () => {
		try {
			const filmsArray: Film[] = Object.entries(films).map(
				([filmId, seen]) => ({ filmId, seen })
			);
			const validationResult = await validateTokenService(filmsArray);
			if (validationResult) {
				const updatedFilms = Object.fromEntries(
					validationResult.films.map((film) => [film.filmId, film.seen])
				);
				setFilms(updatedFilms);
				setTotalFilms(calculateTotalFilms(updatedFilms));
				updateLocalStorage(name, userId, updatedFilms);
			}
		} catch (error) {
			console.error('Error syncing with database:', error);
		}
	};

	const updateLocalStorage = (
		name: string,
		userId: string,
		films: Record<string, boolean>
	) => {
		localStorage.setItem('user', JSON.stringify({ name, userId, films }));
	};

	const setNameAndInitial = (newName: string) => {
		setName(newName);
		setUserInitial(getUserInitial(newName));
	};

	const resetUser = () => {
		setIsAuthenticated(false);
		setName('');
		setUserId('');
		setUserInitial('');
		setFilms(defaultFilms);
		setTotalFilms(0);
		localStorage.setItem(
			'user',
			JSON.stringify({ name: '', userId: '', films: defaultFilms })
		);
	};

	const value: UserContextType = {
		isAuthenticated,
		isLoading,
		name,
		films,
		userId,
		totalFilms,
		userInitial,
		setUserId,
		setIsAuthenticated,
		setName: setNameAndInitial,
		toggleFilm,
		syncWithDatabase,
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
