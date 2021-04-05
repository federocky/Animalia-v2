import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface Payload {
    id: number;
    iat: number;
    exp: number;
}

/**Middleware que comprueba que se tenga un token válido, verificando la fecha de expiracion */
export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token = req.header('auth-token');
    const expire_date = req.header('token-expire');

    if(!token || !expire_date) return res.status(401).json({ok:false, messsage: 'Unauthorized'});

    try{

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentest') as Payload;

        if(!expire(expire_date)) throw Error();

        req.user_id = decoded.id;
        next();

    } catch(error){
        res.status(201).json({ok: false, message: 'Invalid token'});
    }
}

function expire( expire_date: any){

    //creamos una nueva fecha
    const expiraDate = new Date();

    //ese tiempo  lo 'convertimos en fecha'
    expiraDate.setTime(expire_date);

    //comparamos esa fecha con la actual y resolvemos.
    if( expiraDate > new Date() ){
      return true
    }

    return false;
}