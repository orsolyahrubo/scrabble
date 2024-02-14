import { loginService } from "./login.service";
import { Request, Response } from 'express';
import { IUser } from '../user/user.model';

export const loginController = {
    async post(req: Request, res: Response, next: any) {
        const user: IUser = {
            email: req.body.email,
            password: req.body.password,
            name: ""
        };
        let result;
        try {
            result = await loginService.login(user);
        } catch (err) {
            return next(err);
        }
        return res.status(200).json(result);
    }
}