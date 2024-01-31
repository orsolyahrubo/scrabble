import { registerService } from './register.service';
import { Request, Response } from 'express';

export const registerController = {
  async post(req: Request, res: Response, next: any) {
    const { name, email, password } = req.body;
    type userType = {
        name: string;
        email: string;
        password: string;
        };
    const user: userType = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    };
    console.log('registerController.post', user);
    let result;
    try {
      result = await registerService.register(user.name, user.email, user.password);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json(result);
  },
};