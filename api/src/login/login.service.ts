import bcrypt from "bcrypt";
import { IUser, UserModel } from '../user/user.model';
import jwt from 'jsonwebtoken';
import config from '../config';

let err: any;

export const loginService = {
    async login(user: IUser) {
        const { email, password } = user;
        const result: any = {};
        const userFromDatabase = await UserModel.findOne({ email });
        if (!userFromDatabase || !await bcrypt.compare(password, userFromDatabase.password)) {
            err = new Error('Email or password is incorrect.');
            err.status = 400;
            throw err;
        } else {
            result.token = jwt.sign({
                userId: user.id, name: user.name, email: user.email, isAdmin: user.isAdmin,
            }, config.jwtSecret!, { expiresIn: '1h' });
        }
        return result;
    }
}