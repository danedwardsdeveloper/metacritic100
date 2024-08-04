import { MenuItem } from '@headlessui/react';
import {
	SunIcon,
	MoonIcon,
	ComputerDesktopIcon,
} from '@heroicons/react/24/outline';

import { useTheme } from '../contexts/useTheme';
import type { Theme } from '../../types';

// import { cleanTailwindClassNames } from '../utils/utils';

export default function ThemeOptions() {
	const { theme, setTheme } = useTheme();

	const options: { text: string; icon: React.ElementType; value: Theme }[] = [
		{
			text: 'Light',
			icon: SunIcon,
			value: 'light',
		},
		{
			text: 'Dark',
			icon: MoonIcon,
			value: 'dark',
		},
		{
			text: 'System',
			icon: ComputerDesktopIcon,
			value: 'system',
		},
	];

	return (
		<>
			{options.map((option) => (
				<MenuItem key={option.text}>
					{({ active }) => (
						<button
							onClick={() => setTheme(option.value)}
							className={`
                                flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:hover:text-white dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600
                                ${active ? 'bg-gray-100' : ''}
                                ${theme === option.value ? 'font-semibold' : ''}
                            `}
						>
							<option.icon className="mr-2 h-5 w-5" aria-hidden="true" />
							{option.text}
						</button>
					)}
				</MenuItem>
			))}
		</>
	);
}
