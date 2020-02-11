import { Request, Response, NextFunction } from "express";

export const wrap = (func: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
    (req: Request, res: Response, next: NextFunction) => func(req, res, next).catch(next);
