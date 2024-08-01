import axios, { AxiosError } from 'axios';

import { currentApiBase } from '../utils/environmentChecks';
import {
	Film,
	ToggleFilmResponse,
	CreateAccountResponse,
	SignInResponse,
	TokenValidationResponse,
} from '../../types';

export const validateTokenService = async (
	films: Film[]
): Promise<TokenValidationResponse | null> => {
	try {
		const response = await axios.post<TokenValidationResponse>(
			`${currentApiBase}/validate-token`,
			{ films },
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		// console.error('Error validating token:', error);
		if (axios.isAxiosError(error)) {
			// console.error('Response:', error.response?.data);
		}
		return null;
	}
};

export const createAccountService = async (
	name: string,
	email: string,
	password: string,
	films: Film[]
): Promise<CreateAccountResponse> => {
	try {
		const response = await axios.post<CreateAccountResponse>(
			`${currentApiBase}/create-account`,
			{ name, email, password, films },
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<CreateAccountResponse>;
			if (axiosError.response) {
				return { message: axiosError.response.data.message };
			}
		}
		return {
			message: 'An unexpected error occurred. Please try again later.',
		};
	}
};

export const signInService = async (
	email: string,
	password: string
): Promise<SignInResponse | null> => {
	try {
		const response = await axios.post<SignInResponse>(
			`${currentApiBase}/sign-in`,
			{ email, password },
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<SignInResponse>;
			if (axiosError.response) {
				return { message: axiosError.response.data.message };
			}
		}
		return {
			message: 'An unexpected error occurred. Please try again later.',
		};
	}
};

export const signOutService = async (): Promise<void> => {
	try {
		await axios.post(
			`${currentApiBase}/sign-out`,
			{},
			{
				withCredentials: true,
			}
		);
		localStorage.removeItem('user');
	} catch (error) {
		console.error('Error during sign out:', error);
	}
};

export const toggleFilmService = async (
	filmId: string,
	seen: boolean
): Promise<ToggleFilmResponse | null> => {
	try {
		const response = await axios.post<ToggleFilmResponse>(
			`${currentApiBase}/toggle-film`,
			{ filmId, seen },
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const axiosError = error as AxiosError<{ error: string }>;
			if (axiosError.response) {
				console.error(
					'Error toggling film:',
					axiosError.response.data.error
				);
			} else {
				console.error('Error toggling film:', axiosError.message);
			}
		} else {
			console.error('Unexpected error:', error);
		}
		return null;
	}
};
