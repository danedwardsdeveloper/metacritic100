import mongoose, { Document } from 'mongoose';

export interface IUserFilm {
	filmId: string;
	seen: boolean;
	notes: string;
}

export interface IUser extends Document {
	userId: string;
	name: string;
	email: string;
	password: string;
	films: IUserFilm[];
}

const UserSchema = new mongoose.Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	films: [
		{
			filmId: String,
			seen: Boolean,
			notes: String,
		},
	],
});

export const User = mongoose.model<IUser>('User', UserSchema);
