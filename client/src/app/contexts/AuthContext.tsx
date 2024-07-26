import { createContext, useContext, useState, useEffect } from 'react';
import { validateToken } from '../services/AuthService';

interface AuthContextType {
	isAuthenticated: boolean;
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
	isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isValid = await validateToken();
				setIsAuthenticated(isValid);
			} catch (error) {
				console.error('Error validating token:', error);
				setIsAuthenticated(false);
			} finally {
				setIsLoading(false);
			}
		};
		checkAuth();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuthenticated, setIsAuthenticated, isLoading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
