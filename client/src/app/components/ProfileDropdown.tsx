import { NavLink } from 'react-router-dom';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

import { useUser } from '../contexts/UserContext.tsx';
import ThemeOptions from './ThemeOptions.tsx';

export default function ProfileDropdown() {
	const { isAuthenticated, initial } = useUser();

	const profileMenu = isAuthenticated
		? [
				{
					name: 'Sign out',
					to: '/sign-out',
				},
		  ]
		: [
				{
					name: 'Create account',
					to: '/create-account',
				},
				{
					name: 'Sign in',
					to: '/sign-in',
				},
		  ];

	return (
		<div className="flex items-center mr-2">
			<Menu as="div" className="relative ml-3">
				<div>
					<MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800">
						<span className="sr-only">Open profile menu</span>
						{isAuthenticated ? (
							<p className="flex items-center justify-center text-white text-xl h-6 w-6">
								{initial}
							</p>
						) : (
							<UserCircleIcon
								className="block h-6 w-6 text-white"
								aria-hidden="true"
							/>
						)}
					</MenuButton>
				</div>
				<MenuItems
					transition
					className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100 dark:divide-gray-500"
				>
					<div className="py-1">
						{profileMenu.map((item) => (
							<MenuItem key={item.name}>
								{() => (
									<NavLink
										to={item.to}
										className="
                                block px-4 py-2 text-sm text-gray-700 dark:hover:text-white dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
									>
										{item.name}
									</NavLink>
								)}
							</MenuItem>
						))}
					</div>
					<div className="py-1">
						<ThemeOptions />
					</div>
				</MenuItems>
			</Menu>
		</div>
	);
}
