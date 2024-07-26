import {
	createContext,
	useState,
	useContext,
	useEffect,
	ReactNode,
} from 'react';
import { filmsData, Film } from '../data/filmsData.ts';

interface FilmsContextType {
	seenFilms: Record<string, boolean>;
	isLoading: boolean;
	toggleFilmSeen: (filmId: string) => void;
	filmsData: Film[];
}

const FilmsContext = createContext<FilmsContextType | undefined>(undefined);

interface FilmsProviderProps {
	children: ReactNode;
}

export const FilmsProvider: React.FC<FilmsProviderProps> = ({ children }) => {
	const [seenFilms, setSeenFilms] = useState<Record<string, boolean>>({});
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		initializeFilms();
	}, []);

	const initializeFilms = () => {
		setIsLoading(true);
		const localSeenFilms: Record<string, boolean> = JSON.parse(
			localStorage.getItem('seenFilms') || '{}'
		);
		setSeenFilms(localSeenFilms);
		setIsLoading(false);
	};

	const toggleFilmSeen = (filmId: string) => {
		setSeenFilms((prev) => {
			const updated = { ...prev, [filmId]: !prev[filmId] };
			localStorage.setItem('seenFilms', JSON.stringify(updated));
			return updated;
		});
	};

	const value: FilmsContextType = {
		seenFilms,
		isLoading,
		toggleFilmSeen,
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
