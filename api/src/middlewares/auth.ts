import jwt from 'jsonwebtoken';
import config from '../config';

export const auth = async (req: any, res: any, next: any) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            res.status(403).send('You need to be logged in to access this route.');
        }
        const decodedToken = jwt.verify(token, config.jwtSecret!);
        req.headers = { ...req.headers, loggedInUserData: decodedToken };
        next();
    } catch (err: any) {
        err.status = 401;
        err.message = {
            status: 'error',
            message: 'You are not authorized to access this route.',
        };
        next(err);
    }
};