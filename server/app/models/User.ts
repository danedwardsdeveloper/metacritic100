import mongoose, { Document, Schema } from 'mongoose';

export interface IUserFilm {
	filmId: string;
	seen: boolean;
}

export interface IUser {
	userId: string;
	name: string;
	email: string;
	password: string;
	filmsSeen: number;
	films: IUserFilm[];
}

export interface IUserDocument extends Document, IUser {}

const UserSchema = new Schema<IUserDocument>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		filmsSeen: { type: Number, default: 0, min: 0 },
		films: [
			{
				filmId: { type: String, required: true },
				seen: { type: Boolean, required: true },
			},
		],
	},
	{
		_id: true,
		collection: 'users',
		id: true,
		toJSON: {
			virtuals: true,
			versionKey: false,
			transform: (doc: IUserDocument, ret: any) => {
				ret.userId = (doc._id as mongoose.Types.ObjectId).toString();
				delete ret._id;
				return ret;
			},
		},
	}
);

UserSchema.virtual('userId').get(function (this: IUserDocument) {
	return (this._id as mongoose.Types.ObjectId).toString();
});

UserSchema.pre('save', function (next) {
	if (this.isModified('films')) {
		this.filmsSeen = this.films.filter((film) => film.seen).length;
	}
	next();
});

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
