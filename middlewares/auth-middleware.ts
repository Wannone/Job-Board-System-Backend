import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

function AuthenticateTokenRecruiters(req: Request, res: Response, next: NextFunction){
    const jwt = require('jsonwebtoken');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, data: User) => {
        if (err || data.role !== 'recruiter') return res.sendStatus(403);
        req.user = {id: data.id, role: data.role}
        next();
    });
}

function AuthenticateTokenApplier(req: Request, res: Response, next: NextFunction){
    const jwt = require('jsonwebtoken');
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: string, data: User) => {
        if (err) return res.sendStatus(403);
        req.user = {id: data.id , role: data.role}
        next();
    });
}

export  {AuthenticateTokenRecruiters, AuthenticateTokenApplier};