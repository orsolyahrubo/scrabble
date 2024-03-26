import bcrypt from "bcrypt";
import { UserModel } from '../user/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

let err: any;

export type LoginInputParams = {
    email: string;
    password: string;
};

export const loginService = {
    async login(user: LoginInputParams) {
        const { email, password } = user;
        const result: { token: string } = { token: '' };
        const userFromDatabase = await UserModel.findOne({ email });
        if (!userFromDatabase || !await bcrypt.compare(password, userFromDatabase.password)) {
            err = new Error('Email or password is incorrect.');
            err.status = 400;
            throw err;
        } else {
            result.token = jwt.sign({
                userId: userFromDatabase.id,
                name: userFromDatabase.name,
                email: userFromDatabase.email,
                isAdmin: userFromDatabase.isAdmin
            }, config.jwtSecret!, { expiresIn: '1h' });
        }
        return result;
    }
}