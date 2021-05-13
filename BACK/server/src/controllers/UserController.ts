import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';
import { Address } from '../models/address.model';
import { encriptPassword, validatePassword } from './AuthController';
class UserController {

    /**Funcion que devuelve todos los usuarios con sus respectivas direcciones. */
    public async index (req: Request, res: Response) {
        
        try{
            
            //carga todos los usuarios
            const users = await db.query(`SELECT * FROM user`);

            /**Funcion que por cada usuario carga sus direcciones
             * tenemos que poner la funcion asi porque si no no funciona la asincronia.
             */
            async function loadAddress() {

                for ( const user of users){

                    user.address =  await db.query(`SELECT * FROM address
                                                    JOIN user_address
                                                    ON user_address.address_id = address.id
                                                    WHERE user_address.user_id = ?`, [user.id]);                  
                }
            }

            await loadAddress();
            
            res.status(200).json({ok:true, data: users});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }
    

    public async store (req: Request, res: Response) {
    
    } 

    /**Funcion que devuelve un usuario por id y sus direcciones si las tiene */
    public async show (req: Request, res: Response) {
                
        const { id } = req.params;

        try{

            //recogemos al usuario
            const user = await db.query(`SELECT *
                                         FROM user
                                         WHERE user.id = ? AND user.active = 1`, [id]);

            
            //si no encuentra el usuario                                         
            if( user.length < 1) return res.status(404).json({ok: false, message: 'User not found', code: 1});

            //si lo encuentra recibimos sus direcciones.
            const address = await db.query(`SELECT * FROM address
                                      JOIN user_address
                                      ON user_address.address_id = address.id
                                      WHERE user_address.user_id = ?
                                      AND active = 1`, [id]);

            //cargamos las direcciones en el usuario
            user[0].address = address;                      
            
            //devuelve al usuario y sus direcciones
            res.status(200).json({ok: true, data: user});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }

    /**Funcion para cambio de contraseña.
     */
    public async updatePassword (req: Request, res: Response) {

        //recibimos el id encriptado jwt
        const id = req.user_id;

        //recogemos las variables enviadas en el body
        let {newPassword, oldPassword} = req.body;

        try{
            //cogemos el password de la bbdd
            const savedPassword = await db.query(`SELECT password FROM user WHERE id = ?`, [id]);

            //si no encuentro el user por Id
            if(savedPassword.length <= 0) return res.status(400).json({ok: false, message: 'User not found', code: 1});
            
            //comprobamos si el password introducido coincide con el almacenado
            const correct: boolean = await validatePassword(oldPassword, savedPassword[0].password);
    
            //si no coincide devolvemos el error
            if(!correct) return res.status(400).json({ok: false, message: 'Incorrect password', code: 2});
    
            //encriptamos el password
            newPassword = await encriptPassword(newPassword);

            //guardamos el nuevo password en la bbdd
            const result = await db.query(`UPDATE user SET password = ? WHERE id = ?`, [newPassword, id]); 

            ///devolvemos resultado afirmativo
            if(result.affectedRows > 0) return res.status(200).json({ok: true, message: 'password changed'});

            //en caso contrario resultado negativo
            res.status(400).json({ok:false, message: 'Something went wrong', code: 3});

        } catch (error){
            console.log(error);

            ///en caso de error devolvemos el error.
            res.status(400).json({ok:false, message: 'Something went wrong', code: 4});
        }

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

    /**FUNCION que hace un borrado logico de un usuario */
    public async destroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE user SET active = 0 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "User not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }

    }

    /**Funcion que recupera un producto por id */
    public async unDestroy (req: Request, res: Response) {
    
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE user SET active = 1 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "User not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }


    /**Funcion que devuelve la direccion principal del usuario utilizando el id
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
            
            if( query.length == 0) return res.status(400).json({ok: false, message: 'No address found'});
            
            
            const address: Address = { ...query[0] };
            
            //Devuelvo los datos respuesta.
            res.status(200).json({ok: true, data: address});

        }catch(error) {
            res.status(400).json({ok: false, error: {code: error.errno, message: error.code}});
            console.log(error);
        }

    }


    public async indexAddressByUser (req: Request, res: Response) {

        //recibimos el id encriptado jwt
        const id = req.user_id;

        try{

            
            const address = await db.query(`SELECT address.* FROM user
                                            JOIN user_address ua 
                                            ON user.id = ua.user_id
                                            JOIN address
                                            ON ua.address_id = address.id
                                            WHERE user.id = ${id}`);
            
            if( address.length == 0) return res.status(200).json({ok: false, code:1, message: 'No address found'});
            
            
            //const address: Address = { ...query };
            
            //Devuelvo los datos respuesta.
            res.status(200).json({ok: true, code:2,  data: address});

        }catch(error) {
            res.status(400).json({ok: false, error: {code: 3, message: error.code}});
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

    /**Funcion que recibe una direccion y un id para actualizar sus datos. */
    public async updateAddress( req: Request, res: Response){

        const { ...address }: Address = req.body;
        const { id } = req.params;

        try{

            const response = await db.query(`UPDATE address SET street_name = ?, street_number = ?,
                                             floor = ?, letter = ?, province = ?,
                                             locality = ?, town = ?, postcode = ?, details = ?
                                             WHERE id = ?`, 
                                           [address.street_name, address.street_number, address.floor,
                                            address.letter, address.province, address.locality,
                                            address.town, address.postcode, address.details, +address.id]);

            
            if( response.affectedRows > 0) return res.status(200).json({ok: true, data: address });

            //si no encuentra la direccion manda el error
            return res.status(400).json({ok: false, message: "Address not found", code: 1});

        } catch (error) {
            console.log(error);
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }

    }

    /**Funcion que recibe el id de direccion por parametro y el id de usuario 
     * encriptado en el token, asigna esa direccion como principal.
     */
    public async setAddressAsMain( req: Request, res: Response){
        
        const { id } = req.params;

        //recibimos el id encriptado jwt
        const user_id = req.user_id;

        try {

            await updateMainAddress(user_id, +id);

            res.status(200).json({ok: true, message: 'Address changed'});

        } catch (error) {

            res.status(400).json({ok:false, message: 'Unable to change the address'});
        }

    }

    /**FUNCION que hace un borrado logico de un usuario */
    public async destroyAddress (req: Request, res: Response) {
    
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE address SET active = 0 WHERE id = ?', [id]);

            //si encuentra la direccion
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Address not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }

    }

    

}

/**
 * Function que recibe el ID de un usuario y la dirección principal.
 * Todas las otras direcciones de este usuario dejaran de ser la principal. 
 */
async function updateMainAddress(user_id: number, address_id: number) {

    try {            
        await db.query(`UPDATE user_address SET main_address = 0 
        WHERE user_id = ? 
        AND main_address = 1`, [user_id]);

        await db.query(`UPDATE user_address SET main_address = 1 
        WHERE user_id = ? 
        AND address_id = ?`, [user_id, address_id]);

    } catch(error) {
        console.log(error);
    }

}


export const userController = new UserController();