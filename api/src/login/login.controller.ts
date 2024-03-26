import { loginService, LoginInputParams } from "./login.service";
import { Request, Response } from 'express';

export const loginController = {
    async post(req: Request, res: Response, next: any) {
        const user: LoginInputParams = {
            email: req.body.email,
            password: req.body.password,
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