import { NavLink } from 'react-router-dom';
import {
	CloseButton,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import ProfileDropdown from './ProfileDropdown.tsx';
import { useUser } from '../contexts/UserContext.tsx';
import { cleanTailwindClassNames } from '../utils/utils';

export default function MenuBar() {
	const { filmsSeen } = useUser();

	const mainMenu = [
		{ name: 'MetaCritic 100', to: '/' },
		{ name: 'About', to: '/about' },
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

							{/* Profile dropdown */}
							<ProfileDropdown />
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
