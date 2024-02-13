import { registerService } from './register.service';
import { Request, Response } from 'express';
import { IUser } from '../user/user.model';
import { ValidationError } from 'yup';

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
            // } catch (err) {
            //     return next(err);
            // }
        } catch (e) {
            const error = e as ValidationError;
            return res.status(422).json({ errors: error.errors });
        }
        return res.status(200).json(result);
    },
};