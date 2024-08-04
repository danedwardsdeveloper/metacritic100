import { createContext, useState, useEffect, useContext } from 'react';
import { Theme, ThemeContextType, ThemeProviderProps } from '../../types';

export const ThemeContext = createContext<ThemeContextType | undefined>(
	undefined
);

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};

export const ThemeProvider = ({
	children,
}: ThemeProviderProps): JSX.Element => {
	const [theme, setTheme] = useState<Theme>('system');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		if (storedTheme) {
			setTheme(storedTheme);
		}
	}, []);

	useEffect(() => {
		const root = window.document.documentElement;
		const isDark =
			theme === 'dark' ||
			(theme === 'system' &&
				window.matchMedia('(prefers-color-scheme: dark)').matches);

		root.classList.toggle('dark', isDark);

		if (theme === 'system') {
			const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
			const handleChange = () =>
				root.classList.toggle('dark', mediaQuery.matches);

			mediaQuery.addEventListener('change', handleChange);
			return () => mediaQuery.removeEventListener('change', handleChange);
		}
	}, [theme]);

	const updateTheme = (newTheme: Theme) => {
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};
