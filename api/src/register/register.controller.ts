import { registerService } from './register.service';
import { Request, Response } from 'express';
import { IUser } from '../user/user.model';

export const registerController = {
    async post(req: Request, res: Response, next: any) {
        const user: IUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        };
        let result;
        try {
            result = await registerService.register(user);
        } catch (err) {
            return next(err);
        }
        return res.status(200).json(result);
    },
};