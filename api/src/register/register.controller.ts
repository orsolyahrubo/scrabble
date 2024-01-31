import { registerService } from './register.service';
import { Request, Response } from 'express';

export const registerController = {
  async post(req: Request, res: Response, next: any) {
    const { name, email, password } = req.body;
    console.log('registerController.post', {name}, email, password);
    let result;
    try {
      result = await registerService.register(name, email, password);
    } catch (err) {
      return next(err);
    }
    return res.status(200).json(result);
  },
};