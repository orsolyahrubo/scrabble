import bcrypt from "bcrypt";
import validator from "validator";
import { IUser, UserModel } from '../user/user.model';

let err: any;

export const registerService = {
    async register(user: IUser) {
        const { name, email, password } = user;
        if (!name && !email && !password) {
            err = new Error('Name, email, and password are required.');
            err.status = 400;
            throw err;
        } else if (!name) {
            err = new Error('Name is required.');
            err.status = 400;
            throw err;
        } else if (!email) {
            err = new Error('Email is required.');
            err.status = 400;
            throw err;
        } else if (!password) {
            err = new Error('Password is required.');
            err.status = 400;
            throw err;
        } else if (password.length < 8) {
            err = new Error('Password must be at least 8 characters.');
            err.status = 400;
            throw err;
        } else if (!validator.isEmail(email)) {
            err = new Error('Email is invalid.');
            err.status = 400;
            throw err;
        } else {
            const isEmailTaken = (await UserModel.findOne({ email })) !== null;
            if (isEmailTaken) {
                err = new Error('Email is already taken.');
                err.status = 400;
                throw err;
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UserModel.create({
            name, email, password: hashedPassword
        });

        return { id: result.id, name: result.name, email: result.email };
    },
};