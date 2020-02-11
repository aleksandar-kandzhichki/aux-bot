import { Request, Response, NextFunction } from 'express';
import auth from '../auth.json';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.auth_token;
    // @ts-ignore
    if (authHeader != auth.auth_token) res.status(401).json({
        error: "Invalid credentials!"
    })
    next();
}
