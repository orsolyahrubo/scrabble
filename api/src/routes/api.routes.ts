import express from 'express';
import cors from 'cors';
import { registerController } from '../register/register.controller';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', registerController.post);

export default router;