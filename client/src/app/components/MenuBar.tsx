import { NavLink } from 'react-router-dom';
import {
	CloseButton,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import {
	Bars3Icon,
	XMarkIcon,
	UserCircleIcon,
} from '@heroicons/react/24/outline';

import { useUser } from '../contexts/UserContext.tsx';

function cleanTailwindClassNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export default function MenuBar() {
	const { isAuthenticated, filmsSeen, initial } = useUser();

	const mainMenu = [
		{ name: 'MetaCritic 100', to: '/' },
		{ name: 'About', to: '/about' },
	];

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
		<Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50 shadow-md">
			{({ open }) => (
				<>
					<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
						<div className="relative flex h-16 items-center justify-between">
							{/* Mobile menu button / desktop navigation */}
							<div className="flex items-center">
								<div className="flex items-center sm:hidden">
									{/* Mobile menu button */}
									<DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="sr-only">Open main menu</span>
										{open ? (
											<XMarkIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Bars3Icon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</DisclosureButton>
								</div>
								{/* Desktop navigation */}
								<div className="hidden sm:block">
									<div className="flex space-x-4">
										{mainMenu.map((item) => (
											<CloseButton
												key={item.name}
												as={NavLink}
												to={item.to}
												className={({
													isActive,
												}: {
													isActive: boolean;
												}) =>
													cleanTailwindClassNames(
														isActive
															? 'bg-gray-900 text-white'
															: 'text-gray-300 hover:bg-gray-700 hover:text-white',
														'rounded-md px-3 py-2 text-sm font-medium'
													)
												}
											>
												{item.name}
											</CloseButton>
										))}
									</div>
								</div>
							</div>

							{/* Film Count */}
							<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
								<div className="text-white">
									<span>{filmsSeen}</span>
									<span className="text-slate-300"> / 100</span>
								</div>
							</div>

							{/* Profile Menu */}
							<div className="flex items-center mr-2">
								<Menu as="div" className="relative ml-3">
									<div>
										<MenuButton className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800">
											<span className="sr-only">
												Open profile menu
											</span>
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
										className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
									>
										{profileMenu.map((item) => (
											<MenuItem key={item.name}>
												{({ active }) => (
													<NavLink
														to={item.to}
														className={cleanTailwindClassNames(
															active ? 'bg-gray-100' : '',
															'block px-4 py-2 text-sm text-gray-700'
														)}
													>
														{item.name}
													</NavLink>
												)}
											</MenuItem>
										))}
									</MenuItems>
								</Menu>
							</div>
						</div>
					</div>

					{/* Mobile menu */}
					<DisclosurePanel className="sm:hidden">
						<div className="space-y-1 px-2 pb-3 pt-2">
							{mainMenu.map((item) => (
								<CloseButton
									key={item.name}
									as={NavLink}
									to={item.to}
									className={({ isActive }: { isActive: boolean }) =>
										cleanTailwindClassNames(
											isActive
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'block rounded-md px-3 py-2 text-base font-medium'
										)
									}
								>
									{item.name}
								</CloseButton>
							))}
						</div>
					</DisclosurePanel>
				</>
			)}
		</Disclosure>
	);
}
