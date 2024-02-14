import express from 'express';
import cors from 'cors';
import { registerController } from '../register/register.controller';
import { validateMiddleware } from '../middlewares/validationMiddleware';
import { registerUserSchema } from '../register/register.schema';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', validateMiddleware(registerUserSchema), registerController.post);

export default router;