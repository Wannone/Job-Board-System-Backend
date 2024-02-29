// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { UserData } from '../models/user';

const jwt = require('jsonwebtoken');

export function authLevelRecruiter(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, data: UserData) => {
        if (err || data.role !== 'recruiter') return res.sendStatus(403);
        req.user = { id: data.id, role: data.role };
        next();
    });
}

export function authLevelApplier(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, data: UserData) => {
        if (err) return res.sendStatus(403);
        req.user = { id: data.id, role: data.role };
        next();
    });
}
