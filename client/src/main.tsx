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
import About from './app/components/About';
import CreateAccount from './app/components/CreateAccount';
import SignIn from './app/components/SignIn';
import SignOut from './app/components/SignOut';
import ErrorElement from './app/components/ErrorElement';

import './index.tailwind.css';

import { UserProvider } from './app/contexts/UserContext';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />} errorElement={<ErrorElement />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="create-account" element={<CreateAccount />} />
			<Route path="sign-in" element={<SignIn />} />
			<Route path="sign-out" element={<SignOut />} />
			<Route path="*" element={<ErrorElement />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
	<React.StrictMode>
		<UserProvider>
			<RouterProvider router={router} />
		</UserProvider>
	</React.StrictMode>
);
