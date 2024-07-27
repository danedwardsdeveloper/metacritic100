import { Outlet, useRouteError } from 'react-router-dom';

import MenuBar from './app/components/MenuBar';
import Footer from './app/components/Footer';
import ErrorElement from './app/components/ErrorElement';

export default function App() {
	const error = useRouteError();

	return (
		<>
			<MenuBar />
			{error ? <ErrorElement /> : <Outlet />}
			<Footer />
		</>
	);
}
