import express from 'express';
import cors from 'cors';
import { registerController } from '../register/register.controller';
import { validateMiddleware } from '../middlewares/validationMiddleware';
import { registerUserSchema } from '../register/register.schema';
import { loginController } from '../login/login.controller';
import { loginUserSchema } from '../login/login.schema';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', validateMiddleware(registerUserSchema), registerController.post);
router.post('/login', validateMiddleware(loginUserSchema), loginController.post);

export default router;