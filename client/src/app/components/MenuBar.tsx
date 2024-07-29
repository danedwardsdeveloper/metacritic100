import { NavLink } from 'react-router-dom';
import {
	CloseButton,
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

import { useUser } from '../contexts/UserContext.tsx';

function classNames(...classes: string[]): string {
	return classes.filter(Boolean).join(' ');
}

export default function MenuBar() {
	const { isAuthenticated } = useUser();

	const navigation = [
		{ name: 'Home', to: '/' },
		{ name: 'Protected', to: '/protected', disabled: !isAuthenticated },
		{
			name: isAuthenticated ? 'Sign out' : 'Sign in',
			to: isAuthenticated ? '/sign-out' : '/sign-in',
		},
	];

	return (
		<Disclosure as="nav" className="bg-gray-800 sticky top-0 z-50 shadow-md">
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
						{/* Mobile menu button*/}
						<DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							<span className="absolute -inset-0.5" />
							<span className="sr-only">Open main menu</span>
							<Bars3Icon
								aria-hidden="true"
								className="block h-6 w-6 group-data-[open]:hidden"
							/>
							<XMarkIcon
								aria-hidden="true"
								className="hidden h-6 w-6 group-data-[open]:block"
							/>
						</DisclosureButton>
					</div>
					<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
						<div className="flex flex-shrink-0 items-center">
							<NavLink to={'/'}>
								<img
									alt="Your Company"
									src="/react.svg"
									className="h-8 w-auto"
								/>
							</NavLink>
						</div>
						<div className="hidden sm:ml-6 sm:block">
							{/*Main Navigation - Desktop*/}
							<div className="flex space-x-4">
								{navigation.map((item) => (
									<CloseButton
										key={item.name}
										as={NavLink}
										to={item.to}
										className={({
											isActive,
										}: {
											isActive: boolean;
										}) =>
											classNames(
												isActive
													? 'bg-gray-900 text-white'
													: 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'block rounded-md px-3 py-2 text-base font-medium',
												item.disabled
													? 'pointer-events-none opacity-50'
													: ''
											)
										}
									>
										{item.name}
									</CloseButton>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/*Main Navigation - Mobile*/}
			<div className="overflow-hidden">
				<DisclosurePanel
					className="sm:hidden origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0"
					transition
				>
					<div className="space-y-1 px-2 pb-3 pt-2">
						{navigation.map((item) => (
							<CloseButton
								key={item.name}
								as={NavLink}
								to={item.to}
								className={({ isActive }: { isActive: boolean }) =>
									classNames(
										isActive
											? 'bg-gray-900 text-white'
											: 'text-gray-300 hover:bg-gray-700 hover:text-white',
										'block rounded-md px-3 py-2 text-base font-medium',
										item.disabled
											? 'pointer-events-none opacity-50'
											: ''
									)
								}
							>
								{item.name}
							</CloseButton>
						))}
					</div>
				</DisclosurePanel>
			</div>
		</Disclosure>
	);
}
