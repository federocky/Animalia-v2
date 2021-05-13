import { Service } from './../models/service.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';


class ServiceController {




    /**devuelve todos los servicios */
    public async index (req: Request, res: Response) {

        try{
            const services = await db.query(`SELECT * FROM service`);
            
            res.status(200).json({ok:true, data: services});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }
    





    public async store (req: Request, res: Response) {
        
    } 



    

    /**devuelve un servicio por id asi*/
    public async show (req: Request, res: Response) {
        
        const { id } = req.params;

        try{
            const service = await db.query(`SELECT * FROM service WHERE id = ?`, [id]);
            

            /**si no encuentra ningún servicio devolvemos el error*/
            if (service.length < 1) return res.status(404).json({ok: false, message: 'Service not found'});
                
            
            res.status(200).json({ok: true, data: service[0]});

        }catch(error){

            if(error.errno == 1054) {
                return res.status(404).json({ok: false, message: 'Incorrect parameters'});
            }
            
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }




    /**Funcioin que recibe un servicio en el body u su id en la cabecera 
     * Actualiza el servicio almacenado en el id con los nuevos datos.
     * Si no encuentra devuelve error
    */
    public async update (req: Request, res: Response) {

        const { ...service }: Service = req.body;
        const { id } = req.params;
        
        try{
            const response = await db.query(`UPDATE service SET name = ?, description = ?,
                                             hour_start = ?, hour_end = ?, price = ?,
                                             active = ? WHERE id = ?`, 
                                           [service.name, service.description, service.hour_start,
                                            service.hour_end, service.price, service.active, +id]);

            if( response.affectedRows > 0) return res.status(200).json({ok: true, data: service });

            //si no encuentra el servicio manda el error
            return res.status(400).json({ok: false, message: "Service not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }




    /**Funcion que elimina un servicio por id */
    public async destroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE service SET active = 0 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Service not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }

    /**Funcion que recupera un servicio por id */
    public async unDestroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE service SET active = 1 WHERE id = ?', [id]);

            //si encuentra el servicio
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Service not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }

    public async indexPostcode (req: Request, res: Response){

        try{
            const result = await db.query(`SELECT postcode FROM postcode`);
            
            let postCodes: number[] = [];

            result.forEach( (elem:any) => {
                postCodes.push(elem.postcode);    
            });

            res.status(200).json({ok:true, data: postCodes});

        } catch(error){
            res.status(404).json({ok: false, message: 'Something went wrong'});
        }
    }

}


export const serviceController = new ServiceController();