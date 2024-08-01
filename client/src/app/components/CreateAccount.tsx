import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useUser } from '../contexts/UserContext.tsx';
import { createAccountService } from '../services/UserService.ts';
import { Film } from '../../types';
import Metadata from './Metadata';

export default function CreateAccount() {
	const [name, setName] = useState('Ben');
	const [email, setEmail] = useState('ben@gmail.com');
	const [password, setPassword] = useState('bensPassword');
	const [errorMessage, setErrorMessage] = useState('');
	const { films } = useUser();

	const navigate = useNavigate();
	const { setIsAuthenticated, setInitial, syncWithDatabase } = useUser();

	const handleSubmit = async (e: React.FormEvent) => {
		const filmsArray: Film[] = Object.entries(films).map(
			([filmId, seen]) => ({ filmId, seen })
		);

		e.preventDefault();
		setErrorMessage('');
		try {
			const result = await createAccountService(
				name,
				email,
				password,
				filmsArray
			);
			if (result && result.userId) {
				console.log('Sign in successful');
				console.log('User ID:', result.userId);
				console.log('Message:', result.message);
				setIsAuthenticated(true);
				setInitial(result.initial || '');
				await syncWithDatabase();

				navigate('/');
			} else {
				setErrorMessage(result?.message || 'Sorry, something went wrong.');
			}
		} catch (error) {
			console.error('Sign in error:', error);
			setErrorMessage('An unexpected error occurred. Please try again.');
		}
	};

	return (
		<>
			<Metadata pageName="Create an account" slug="create-account" />

			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="MetaCritic 100"
						src="/filmStrip.svg"
						className="mx-auto h-10 w-auto"
					/>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Create an account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								First name
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									type="name"
									required
									autoComplete="name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Email
								</label>
							</div>
							<div className="mt-2">
								<input
									id="email"
									name="email"
									type="email"
									required
									autoComplete="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Create a password
								</label>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									required
									autoComplete="new-password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div>
							{errorMessage && (
								<div className="error text-sm pb-2">
									<p className="font-semibold text-center text-red-500 ">
										{errorMessage}
									</p>
								</div>
							)}
							<button
								type="submit"
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Create account
							</button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{' '}
						<Link
							to={`/sign-in`}
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}
