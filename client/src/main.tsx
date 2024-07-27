import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import App from './App';
import FilmsList from './app/components/FilmsList';
import Protected from './app/components/Protected';
import SignIn from './app/components/SignIn';
import SignOut from './app/components/SignOut';
import ErrorElement from './app/components/ErrorElement';

import './index.tailwind.css';

import { AuthProvider } from './app/contexts/AuthContext';
import { FilmsProvider } from './app/contexts/FilmsContext';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorElement />}>
			<Route index element={<FilmsList />} />
			<Route path="protected" element={<Protected />} />
			<Route path="sign-in" element={<SignIn />} />
			<Route path="sign-out" element={<SignOut />} />
			<Route path="*" element={<ErrorElement />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<FilmsProvider>
				<RouterProvider router={router} />
			</FilmsProvider>
		</AuthProvider>
	</React.StrictMode>
);
