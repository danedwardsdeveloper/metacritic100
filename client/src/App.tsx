import { Outlet, useRouteError } from 'react-router-dom';

import MenuBar from './app/components/MenuBar';
import Footer from './app/components/Footer';
import ErrorElement from './app/components/ErrorElement';

export default function App() {
	const error = useRouteError();

	return (
		<>
			<MenuBar />
			<main className="relative min-h-screen overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-200 via-purple-200 to-pink-200 opacity-30"></div>
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-yellow-100 via-green-100 to-blue-100 opacity-20"></div>
				</div>
				<div className="relative z-10">
					{error ? <ErrorElement /> : <Outlet />}
				</div>
			</main>
			<Footer />
		</>
	);
}
