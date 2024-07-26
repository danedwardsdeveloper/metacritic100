import axios, { AxiosError } from 'axios';

import { currentApiBase } from '../utils/environmentChecks';

interface TokenValidationResponse {
	valid: boolean;
}

export const validateToken = async (): Promise<boolean> => {
	try {
		const response = await axios.get<TokenValidationResponse>(
			`${currentApiBase}/validate-token`,
			{
				withCredentials: true,
			}
		);
		return response.data.valid;
	} catch (error) {
		console.error('Error validating token:', error);
		return false;
	}
};

interface SignInResponse {
	message: string;
	userId?: number;
}

export const signIn = async (
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

export const signOut = async (): Promise<void> => {
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
