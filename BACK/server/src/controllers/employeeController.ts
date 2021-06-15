import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';
import { Address } from '../models/address.model';
import { encriptPassword, validatePassword } from './AuthController';
class EmployeeController {

    /**Funcion que devuelve todos los usuarios con sus respectivas direcciones. */
    public async index (req: Request, res: Response) {
        
        try{
            
            //carga todos los usuarios
            const employees = await db.query(`SELECT e.*, eh.salary, eh.details 
                                              FROM employee e
                                              JOIN employee_history eh on e.id = eh.employee_id`);
            
            res.status(200).json({ok:true, data: employees});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }




    
    /**Funcion que devuelve un empleado por id y sus direcciones si las tiene */
    public async show (req: Request, res: Response) {
                
        const { id } = req.params;

        try{

            //recogemos al empleado
            const employee = await db.query(`SELECT e.*, eh.salary, eh.details FROM employee e
                                             JOIN employee_history eh on e.id = eh.employee_id                             
                                              WHERE id = ?`, [id]);

            
            //si no encuentra el empleado                                         
            if( employee.length < 1) return res.status(404).json({ok: false, message: 'Employee not found', code: 1});                
            
            //devuelve al usuario y sus direcciones
            res.status(200).json({ok: true, data: employee});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }

    /**Funcion para actualizar un empleado
     */
     public async update (req: Request, res: Response) {

        //recibimos el id encriptado jwt
        const id = req.employee_id;
        
        //recogemos las variables enviadas en el body
        const {name, surname, email, active, is_admin, phone, salary, details} = req.body;

        try{

            //TODO: ampliacion, meter transacciones.
            await db.query(`UPDATE employee SET
                                name = ?, surname = ?, email = ?,
                                active = ?, is_admin = ?, phone = ?
                                where id = ?`, 
                                [name, surname, email, active, is_admin, phone, id]);

            await db.query(`UPDATE employee_history SET
                            employee_id = ?, salary = ?, details = ?`,
                            [id, salary, details]);

            res.status(200).json({ok: true});

        } catch (error){
            res.status(400).json({ok: false, error: error.errno});
            console.log(error);
        }
    }

    /**FUNCION que hace un borrado logico de un usuario */
    public async destroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE employee SET active = 0 WHERE id = ?', [id]);

            //si encuentra el empleado
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Employee not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }

    }

    /**Funcion que recupera un usuario por id */
    public async unDestroy (req: Request, res: Response) {
    
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE employee SET active = 1 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Employee not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }

    

}



export const employeeController = new EmployeeController();