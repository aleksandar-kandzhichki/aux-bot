import { Request, Response, NextFunction } from 'express';
import auth from '../auth.json';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["Authorization"];
    if (authHeader != `Bearer ${auth.auth_token}`) res.status(401).json({
        error: "Invalid credentials!"
    })
    next();
}
