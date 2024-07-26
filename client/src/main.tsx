import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	Route,
} from 'react-router-dom';

import App from './App';
import Home from './app/components/Home';
import Protected from './app/components/Protected';
import SignIn from './app/components/SignIn';
import SignOut from './app/components/SignOut';

import './index.tailwind.css';

import { AuthProvider } from './app/contexts/AuthContext';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index element={<Home />} />
			<Route path="protected" element={<Protected />} />
			<Route path="sign-in" element={<SignIn />} />
			<Route path="sign-out" element={<SignOut />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
