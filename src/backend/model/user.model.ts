import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../../shared/types/user.types';

export interface IUserDocument extends Omit<User, "_id">, Document { }

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        cid: { type: String, required: true },
        rating: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUserDocument>('User', UserSchema);
