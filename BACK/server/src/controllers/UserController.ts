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

    public async update (req: Request, res: Response) {

        const { id } = req.params;
        

        let user: User = {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            active: req.body.active,
            phone: req.body.phone,
        }

        try{

            const query = await db.query(`UPDATE user SET
                                        name = ?, surname = ?, email = ?,
                                        active = ?, phone = ?
                                        where id = ?`, 
                                        [user.name, user.surname, user.email, user.active, user.phone, id]);

            res.status(200).json({ok: true});

        } catch (error){
            res.status(400).json({ok: false});
            console.log(error);
        }


    }

    public async destroy (req: Request, res: Response) {

    }

    public async getAddress (req: Request, res: Response) {
        const { id } = req.params;

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

    }


    public async setAddress( req: Request, res: Response) {

        const address: Address = { 
            street_name: req.body.street_name,
            street_number: req.body.street_number,
            floor: req.body.floor,
            letter: req.body.letter,
            province: req.body.province,
            locality: req.body.locality,
            town: req.body.town,
            postcode: req.body.postcode,
            details: req.body.details,
            active: true
         };
        const { id } = req.params;

        //TODO: al cambiar la direccion deberiamos ver si el usuario tiene mas para quitarlas de principal.
        try{
            const response = await db.query(`INSERT INTO address (street_name, street_number, floor, letter, province, locality, town, postcode, details) 
                                             VALUES (?,?,?,?,?,?,?,?,?)`, 
                                             [address.street_name, address.street_number, address.floor, address.letter, address.province, address.locality
                                            , address.town, address.postcode, address.details]);
            
            await db.query(`INSERT INTO user_address (user_id, address_id, main_address)
                            VALUES(?,?,?)`,
                            [id, response.insertId, true ]);

            res.status(200).json({ok: true, address_id: response.insertId});
                            
        } catch (error) {

            res.status(400).json({ok: false, message: 'Error with bbdd'});
        }
    }

}


export const userController = new UserController();