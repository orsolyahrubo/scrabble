import express from 'express';
import cors from 'cors';
import { registerController } from '../register/register.controller';
import { validateMiddleware } from '../middlewares/validationMiddleware';
import { registerUserSchema } from '../register/register.schema';
import { loginController } from '../login/login.controller';
import { loginUserSchema } from '../login/login.schema';
import { auth } from '../middlewares/auth';
import { gameController } from '../game/game.controller';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', validateMiddleware(registerUserSchema), registerController.post);
router.post('/login', validateMiddleware(loginUserSchema), loginController.post);
router.get('/games', auth, gameController.get);
router.get('/games/:gameId', auth, gameController.getOne);

export default router;