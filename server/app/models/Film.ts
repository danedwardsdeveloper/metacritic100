import mongoose, { Document } from 'mongoose';

export interface IFilm extends Document {
	filmId: string;
	title: string;
	year: number;
	language: string;
	description: string;
	metascore: number;
	rank: number;
}

const FilmSchema = new mongoose.Schema<IFilm>({
	filmId: String,
	title: String,
	year: Number,
	language: String,
	description: String,
	metascore: Number,
	rank: Number,
});

export const Film = mongoose.model<IFilm>('Film', FilmSchema);
