import { useNavigate } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../services/AuthService';

export default function SignOut() {
	const navigate = useNavigate();
	const { setIsAuthenticated } = useAuth();

	const handleSignOut = async () => {
		try {
			await signOut();
			setIsAuthenticated(false);
			navigate('/sign-in');
		} catch (error) {
			console.error('Error signing out:', error);
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<img
						alt="Your Company"
						src="/react.svg"
						className="mx-auto h-10 w-auto"
					/>
				</div>

				<div className="my-40 sm:mx-auto sm:w-full sm:max-w-sm">
					<div>
						<button
							type="submit"
							onClick={handleSignOut}
							className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Sign out
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
