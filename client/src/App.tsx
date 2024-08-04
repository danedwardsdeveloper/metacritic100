import { Outlet, useRouteError } from 'react-router-dom';

import MenuBar from './app/components/MenuBar';
import Footer from './app/components/Footer';
import ErrorElement from './app/components/ErrorElement';
import GradientBackground from './app/components/GradientBackground';

export default function App() {
	const error = useRouteError();

	return (
		<>
			<MenuBar />
			<main className="relative min-h-screen overflow-hidden">
				<GradientBackground />
				<div className="relative z-10">
					{error ? <ErrorElement /> : <Outlet />}
				</div>
			</main>
			<Footer />
		</>
	);
}
