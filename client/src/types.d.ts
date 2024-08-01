export interface Film {
	filmId: string;
	seen: boolean;
}

export interface ToggleFilmResponse {
	message: string;
	filmId: string;
	newStatus: boolean;
}

export interface TokenValidationResponse {
	message: string;
	initial: string;
	userId: string;
	filmsSeen: number;
	films: Film[];
}

export interface CreateAccountResponse {
	message: string;
	userId?: string;
	initial?: string;
}

export interface SignInResponse {
	message: string;
	userId?: number;
	initial?: string;
}

export interface UserContextType {
	isLoading: boolean;
	isAuthenticated: boolean;
	userId: string;
	initial: string;
	films: Record<string, boolean>;
	filmsSeen: number;
	syncWithDatabase: () => void;
	setIsAuthenticated: (value: boolean) => void;
	setInitial: (name: string) => void;
	setUserId: (userId: string) => void;
	toggleFilm: (filmId: string) => void;
	resetUser: () => void;
}
