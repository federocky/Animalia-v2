import { User } from './../models/user.model';
import { Request, Response } from 'express';

//importamos la bbdd
import db from '../database';

import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';


class AuthController {

    /**Registro de usuario */
    public async signUp(req: Request, res: Response) {

        //TODO: validar que se han rellenado todos los campos. ¿MIDDLEWARE?

        //creamos un usuario con los datos recibidos en el body
        let user: User = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
        } 

        //let { name, surname, email, password } = req.body;

        //encriptamos la contraseña
        user.password = await encriptPassword( user.password );

        /**Si el email no existe guardamos los datos */
        try {
            await db.query('INSERT INTO user (name, surname, email, password) VALUES (?,?,?,?)', [user.name, user.surname, user.email, user.password]);
            res.status(200).json({ok: true, data: user.email });

        } catch (error) {
            /**si existe el email */
           if(error.errno == 1062) res.status(400).json({ok: false, message: 'the email already exists'});

            /**cualquier otro error */
            res.status(400).json({ok: false, message: 'Connection error'});
        }
        
    }


    /**Login de usuario */
    public async signIn(req: Request, res: Response) {

        //TODO:comprobar que se han rellenado todos los campos.
        
        let user = [];
        user = await db.query('SELECT * FROM user WHERE email = ?', [req.body.email]);
        
        //si no encuentra el email en la bbdd
        if (user.length < 1) return res.status(400).json({ok: false, message: 'Email does not exists'});

        //comprobamos el password
        const correct: boolean = await validatePassword(req.body.password, user[0].password);

        //si no es correcto
        if(!correct) return res.status(400).json({ok: false, message: 'incorrect password'});


        /*FIXME: comprobar que se deberia poner en tokentest y tambien en el .env 
        Tambien mirar el tema del id si esta bien ahi.*/
        const token: string = jwt.sign({id: user[0].id}, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24     //caduca despues de un día 
        });

        //FIXME: ¿esta bien mandar el token en el body? ¿es mejor en la cabecera?
        res.status(200).json({ok: true, data: user[0], token});

    }

}


//FIXME: mirar como poner esto como metodos privados de la clase.
/**Encriptamos el password */
async function encriptPassword( password: string ): Promise<string> {
    
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


/**Validamos si el password es correcto */
async function validatePassword( passwordIntroducido: string, password: string ): Promise<boolean> {
    return await bcrypt.compare(passwordIntroducido, password);
}



export const authController = new AuthController();