import { Employee } from './../models/employee.model';
import { User } from './../models/user.model';
import { Request, Response } from 'express';

//importamos la bbdd
import db from '../database';

//bcryptjs para encriptar las contraseñas
import bcrypt from 'bcryptjs';

//jwt para los tokens
import jwt from 'jsonwebtoken';

//importamos funciones necesarias.
import {Function} from '../utils/functions';


class AuthController {

    /**Registro de usuario */
    public async signUp(req: Request, res: Response) {

        //creamos un usuario con los datos recibidos en el body
        let { ...user }: User = req.body;

        //Validamos el passowrd
        if(!user.password || user.password.length < 8) return res.status(400).json({ok: false, error: 'password must be at least 8 chars long'});

        //encriptamos la contraseña
        user.password = await encriptPassword( user.password );

        /**Si el email no existe guardamos los datos */
        try {
            await db.query('INSERT INTO user (name, surname, email, password, phone) VALUES (?,?,?,?,?)', [user.name, user.surname, user.email, user.password, user.phone]);
            res.status(200).json({ok: true, data: user.email });

        } catch (error) {
            /**si existe el email */
            console.log(error);
           if(error.errno == 1062) return res.status(400).json({ok: false, message: 'the email already exists', code: 1});
            
            /**cualquier otro error */
            return res.status(400).json({ok: false, message: 'Connection error'});
        }
        
    }


    /**Login de usuario */
    public async signIn(req: Request, res: Response) {

        const { email, password } = req.body;

        //validamos el email
        if( !email || !Function.validateEmail(email)) return res.status(200).json({ok: false, message: "invalid email"})

        let user = [];
        user = await db.query('SELECT * FROM user WHERE email = ? AND active = 1', [email]);
        
        //si no encuentra el email en la bbdd
        if (user.length < 1) return res.status(400).json({ok: false, message: 'Email does not exists', code: 1});

        //comprobamos el password
        const correct: boolean = await validatePassword(password, user[0].password);

        //si no es correcto
        if(!correct) return res.status(400).json({ok: false, message: 'incorrect password', code: 2});


        /*FIXME: comprobar que se deberia poner en tokentest y tambien en el .env .*/
        const token: string = jwt.sign({id: user[0].id}, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24    
        });

        return res.status(200).json({ok: true, data: user[0], token});

    }

    /**Registro de empleado */
    public async employeeSignUp(req: Request, res: Response) {

        //creamos un usuario con los datos recibidos en el body
        let { ...employee }: Employee = req.body;

        //Validamos el passowrd
        if(!employee.password || employee.password.length < 8) return res.status(400).json({ok: false, error: 'password must be at least 8 chars long'});

        //encriptamos la contraseña
        employee.password = await encriptPassword( employee.password );

        //TODO: ampliación. Necesita transaccion.

        /**Si el email no existe guardamos los datos */
        try {
            const insertedEmployee = await db.query('INSERT INTO employee (name, surname, email, password, phone, is_admin) VALUES (?,?,?,?,?,?)', [employee.name, employee.surname, employee.email, employee.password, employee.phone, employee.is_admin]);
            await db.query('INSERT INTO employee_history (employee_id, salary, details) VALUES (?,?,?)', [insertedEmployee.insertId, employee.salary, employee.details]);
            res.status(200).json({ok: true, data: employee.email });


        } catch (error) {
            console.log(error);
            /**si existe el email */
            if(error.errno == 1062) return res.status(400).json({ok: false, message: 'the email already exists', code: 1});

            /**cualquier otro error */
            return res.status(400).json({ok: false, message: 'Connection error'});
        }
        
    }

    /**Login de empleado */
    public async employeeSignIn(req: Request, res: Response) {

        const { email, password } = req.body;

        //validamos el email
        if( !email || !Function.validateEmail(email)) return res.status(200).json({ok: false, message: "invalid email"})

        let employee = [];
        employee = await db.query(`SELECT e.*, eh.salary, eh.details FROM employee e
                                   JOIN employee_history eh on e.id = eh.employee_id                             
                                   WHERE email = ? AND active = 1`, [email]);
        
        //si no encuentra el email en la bbdd
        if (employee.length < 1) return res.status(400).json({ok: false, message: 'Email does not exists', code: 1});

        //comprobamos el password
        const correct: boolean = await validatePassword(password, employee[0].password);

        //si no es correcto
        if(!correct) return res.status(400).json({ok: false, message: 'incorrect password', code: 2});


        /*TODO: ampliacion, mejorar el tokentest*/
        const token: string = jwt.sign({id: employee[0].id, admin: employee[0].is_admin}, process.env.TOKEN_SECRET || 'tokentest', {
            expiresIn: 60 * 60 * 24     
        });

        return res.status(200).json({ok: true, data: employee[0], token});

    }

}


/**Encriptamos el password */
export async function encriptPassword( password: string ): Promise<string> {
    
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};


/**Validamos si el password es correcto */
export async function validatePassword( passwordIntroducido: string, password: string ): Promise<boolean> {
    return await bcrypt.compare(passwordIntroducido, password);
}



export const authController = new AuthController();