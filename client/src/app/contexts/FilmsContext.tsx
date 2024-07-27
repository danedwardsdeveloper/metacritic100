import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from 'react';

import { filmsData, Film } from '../data/filmsData.ts';
import { useAuth } from './AuthContext';
import {
	getUserFilmsFromDb,
	updateDatabaseWithLocalChanges,
} from '../services/FilmsService.ts';

interface FilmsContextType {
	seenFilms: Record<string, boolean>;
	isLoading: boolean;
	toggleFilmSeen: (filmId: string) => void;
	filmsData: Film[];
	syncWithDatabase: () => Promise<void>;
}

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

interface FilmsProviderProps {
	children: ReactNode;
}

export const FilmsProvider: React.FC<FilmsProviderProps> = ({ children }) => {
	const [seenFilms, setSeenFilms] = useState<Record<string, boolean>>({});
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		initializeFilms();
	}, []);

	useEffect(() => {
		if (isAuthenticated) {
			syncWithDatabase();
		}
	}, [isAuthenticated]);

	const initializeFilms = () => {
		setIsLoading(true);
		const localStorageFilms: Record<string, boolean> = JSON.parse(
			localStorage.getItem('seenFilms') || '{}'
		);
		setSeenFilms(localStorageFilms);
		setIsLoading(false);
	};

	const toggleFilmSeen = (filmId: string) => {
		setSeenFilms((prev) => {
			const updated = { ...prev, [filmId]: !prev[filmId] };
			localStorage.setItem('seenFilms', JSON.stringify(updated));
			return updated;
		});
	};

	const syncWithDatabase = async () => {
		setIsLoading(true);
		try {
			const dbSeenFilms = await getUserFilmsFromDb();

			const mergedSeenFilms = { ...seenFilms, ...dbSeenFilms };

			localStorage.setItem('seenFilms', JSON.stringify(mergedSeenFilms));
			setSeenFilms(mergedSeenFilms);

			await updateDatabaseWithLocalChanges(mergedSeenFilms);
		} catch (error) {
			console.error('Error syncing with database:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const value: FilmsContextType = {
		toggleFilmSeen,
		syncWithDatabase,
		seenFilms,
		isLoading,
		filmsData,
	};

	return (
		<FilmsContext.Provider value={value}>{children}</FilmsContext.Provider>
	);
};

export const useFilms = (): FilmsContextType => {
	const context = useContext(FilmsContext);
	if (context === undefined) {
		throw new Error('useFilms must be used within a FilmsProvider');
	}
	return context;
};
