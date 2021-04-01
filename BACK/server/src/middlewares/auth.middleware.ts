import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
    id: number;
    iat: number;
    exp: number;
}

export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');

    if(!token) return res.status(401).json({ok:false, messsage: 'Unauthorized'});

    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as Payload;
        req.user_id = decoded.id;
        next();

    } catch(error){
        res.status(201).json({ok: false, message: 'Invalid token'});
    }
}