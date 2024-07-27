import axios, { AxiosError } from 'axios';
import { currentApiBase } from '../utils/environmentChecks';

export async function getUserFilmsFromDb(): Promise<Record<string, boolean>> {
    try {
        const response = await axios.get(`${currentApiBase}/films/seen`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                console.error('Error fetching seen films:', error.response.data);
                console.error('Status:', error.response.status);
            } else if (error.request) {
                console.error('Error fetching seen films: No response received');
            } else {
                console.error('Error fetching seen films:', error.message);
            }
        } else {
            console.error('Unexpected error fetching seen films:', error);
        }
        throw error;
    }
}

export async function updateDatabaseWithLocalChanges(seenFilms: Record<string, boolean>): Promise<void> {
    try {
        await axios.post(`${currentApiBase}/films/seen`, seenFilms, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response) {
                console.error('Error updating seen films:', error.response.data);
                console.error('Status:', error.response.status);
            } else if (error.request) {
                console.error('Error updating seen films: No response received');
            } else {
                console.error('Error updating seen films:', error.message);
            }
        } else {
            console.error('Unexpected error updating seen films:', error);
        }
        throw error;
    }
}