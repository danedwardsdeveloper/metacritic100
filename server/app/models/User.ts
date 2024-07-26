import mongoose, { Document, Schema } from 'mongoose'

interface IFilm {
    name: string;
    filmId: string;
    seen: boolean;
    notes?: string;
}

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    films: { [key: string]: IFilm };
}

const FilmSchema = new Schema({
    name: { type: String, required: true },
    filmId: { type: String, required: true },
    seen: { type: Boolean, default: false },
    notes: { type: String }
})

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    films: { type: Map, of: FilmSchema, default: {} }
})

export const User = mongoose.model<IUser>('User', UserSchema)