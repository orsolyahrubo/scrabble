import bcrypt from "bcrypt";
import { IUser, UserModel } from '../user/user.model';
import { registerUserSchema } from './register.schema';

let err: any;

export const registerService = {
    async register(user: IUser) {
        const data = registerUserSchema.validateSync(user, { abortEarly: false, stripUnknown: true });
        const { name, email, password } = data;
        const isEmailTaken = (await UserModel.findOne({
            email
        })) !== null;
        if (isEmailTaken) {
            err = new Error('Email is already taken.');
            err.status = 400;
            throw err;
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await UserModel.create({
            name, email, password: hashedPassword
        });
        return { id: result.id, name: result.name, email: result.email };
    }
};