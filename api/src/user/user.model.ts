import mongoose from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    id?: string;
    isAdmin?: boolean;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},
    {
        toJSON: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        },
        toObject: {
            virtuals: true,
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret.__v;
                delete ret._id;
            }
        }
    });

export const UserModel = mongoose.model<IUser>("UserModel", userSchema, "users");