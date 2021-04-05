import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';
import { Address } from '../models/address.model';
import { User } from '../models/user.model';

class UserController {

    public async index (req: Request, res: Response) {
        res.json({data: 'hola'});
    }
    
    public async store (req: Request, res: Response) {
    
    } 

    public async show (req: Request, res: Response) {
                
    

    }

    /**Funcion que recibe un user y se utiliza para actualizar su nombre, apellido,
     * email, activo o telefono.
     */
    public async update (req: Request, res: Response) {

        //recibimos el id encriptado jwt
        const id = req.user_id;
        
        //recogemos las variables enviadas en el body
        const {name, surname, email, active, phone} = req.body;

        try{

            const query = await db.query(`UPDATE user SET
                                        name = ?, surname = ?, email = ?,
                                        active = ?, phone = ?
                                        where id = ?`, 
                                        [name, surname, email, active, phone, id]);

            res.status(200).json({ok: true});

        } catch (error){
            res.status(400).json({ok: false, error: error.errno});
            console.log(error);
        }


    }

    public async destroy (req: Request, res: Response) {

    }


    /**Funcion que devuelve la direccion del usuario utilizando el id
     * desencriptado del jwt
     */
    public async showAddress (req: Request, res: Response) {

        //recibimos el id encriptado jwt
        const id = req.user_id;

        try{

            /**Realizo la consulta a la BBDD */
            const query = await db.query(`SELECT address.* FROM user
            JOIN user_address ua 
            ON user.id = ua.user_id
            JOIN address
            ON ua.address_id = address.id
            WHERE user.id = ${id}
            AND main_address = true`);
            
            if( query.length == 0) res.status(400).json({ok: false, message: 'No address found'});
            
            
            const address: Address = { ...query[0] };
            
            //Devuelvo los datos respuesta.
            res.status(200).json({ok: true, data: address});

        }catch(error) {
            res.status(400).json({ok: false, error: {code: error.errno, message: error.code}});
            console.log(error);
        }

    }

    /**Funcion que recibe una direccion y la guarda como principal para ese usuario */
    public async storeAddress( req: Request, res: Response) {

        const { ...address }: Address = req.body;

        //recibimos el id encriptado jwt
        const id = req.user_id;

        try{
            const response = await db.query(`INSERT INTO address (street_name, street_number, floor, letter, province, locality, town, postcode, details) 
                                             VALUES (?,?,?,?,?,?,?,?,?)`, 
                                             [address.street_name, address.street_number, address.floor, address.letter, address.province, address.locality
                                            , address.town, address.postcode, address.details]);
            
            await db.query(`INSERT INTO user_address (user_id, address_id, main_address)
                            VALUES(?,?,?)`,
                            [id, response.insertId, true ]);

            //dejamos la nueva direccion como principal
            await updateMainAddress(id, response.insertId);

            res.status(200).json({ok: true, address_id: response.insertId});
                            
        } catch (error) {
            console.log(error);
            res.status(400).json({ok: false, message: 'Error saving the address'});
        }
    }

    


}

/**
 * Function que recibe el ID de un usuario y la dirección principal.
 * Todas las otras direcciones de este usuario dejaran de ser la principal. 
 */
async function updateMainAddress(user_id: number, address_id: number) {

    try {            
        const aver = await db.query(`UPDATE user_address SET main_address = 0 
        WHERE user_id = ? 
        AND main_address = 1 
        AND address_id != ?`, [user_id, address_id]);

    } catch(error) {
        console.log(error);
    }

}


export const userController = new UserController();