import jwt from 'jsonwebtoken';
import config from '../config';

export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log('az authban talalhato token', token);
        if (!token) {
            res.status(403).send('You are not authorized.');
        }
        const decodedToken = await jwt.verify(token, config.jwtSecret!);
        req.headers = { ...req.headers, loggedInUserData: decodedToken };
        next();
    } catch (err: any) {
        err.status = 401;
        err.message = {
            status: 'error',
            message: 'Invalid token',
        };
        next(err);
    }
};