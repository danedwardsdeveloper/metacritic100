import { Outlet } from 'react-router-dom';

import MenuBar from './app/components/MenuBar';
import Footer from './app/components/Footer';

export default function App() {
	return (
		<>
			<MenuBar />
			<Outlet />
			<Footer />
		</>
	);
}
