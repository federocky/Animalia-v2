import { Appointment } from './../models/appointment.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class AppointmentController {

    /**devuelve todas las citas. */
    public async index (req: Request, res: Response) {

        try{
            const appointments = await db.query(`SELECT * FROM appointment`);
    
            
            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }



    /**devuelve todas las citas de un usuario */
    public async indexByUser (req: Request, res: Response) {

        const { id } = req.params;

        try{
            const appointments = await db.query(`SELECT * FROM appointment WHERE id = ?`, [+id]);
    
            /**si no encuentra ningún appointment devolvemos el resultado*/
            if (appointments.length < 1) return res.status(200).json({ok: false, message: 'The user has no appointments'});
            
            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }


    /**devuelve hora de inicio y fin de las citas en una fecha determinada de un determinado servicio */
    public async indexByDate (req: Request, res: Response) {

        const date: Date = req.body.date; 

        if(!date)return res.status(400).json({ok: false, message: 'Date needed'});
        
        console.log(date);
        //TODO: castear la date a solo date si la mando completa o mandarla ya casteada

        try{
            const appointments = await db.query(`SELECT DATE_FORMAT(date_appointment_from, '%H:%i') AS hour_from, DATE_FORMAT(date_appointment_to, '%H:%i') AS hour_to
                                                    FROM appointment WHERE date_appointment_from LIKE  ?
                                                    ORDER BY hour_from
                                                    `, [date+'%']);
    
            /**si no encuentra ningún appointment devolvemos el resultado*/
            if (appointments.length < 1) return res.status(200).json({ok: false, message: 'The user has no appointments'});

            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            console.log(error);
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }


    public async create(req: Request, res: Response) {
        
    }
    

    /**Funcion para almacenar una nueva cita.
     */
    public async store (req: Request, res: Response) {
        
        //recibimos el desencriptado del token
        const user_id = req.user_id;

        //recibimos los datos del servicio
        const { ...appointment }: Appointment = req.body;
        //const {service_id, date_appointment_from, date_appointment_to, address_id, price } = req.body;


        try{
            const checkAvailability = await db.query(`SELECT id FROM appointment WHERE date_appointment_from = ?`, [appointment.date_appointment_from]);

            //TODO: meter validacion que la hora debe ser una posterior y no inferior o cosas raras. tambien que sea la misma fecha.

            if (checkAvailability.length >= 2) return res.status(400).json({ok: false, message: 'Date and time already reserved'});
            
            const response = await db.query(`INSERT INTO appointment (service_id, date_appointment_from, date_appointment_to,
                                        user_id, price, address_id ) values (?,?,?,?,?,?)`, 
                                        [appointment.service_id, appointment.date_appointment_from, appointment.date_appointment_to, 
                                        appointment.user_id, appointment.price, appointment.address_id]);

            
            res.status(200).json({ok: true, appointment_id: response.insertId});

        } catch (error){
            console.log(error);            
            res.status(400).json({ok: false, message: 'Something went wrong'});
        }

    } 

    

    /**devuelve un producto por id asi como su rating y numero de votos */
    public async show (req: Request, res: Response) {

        const id = req.params.id;

        try{
            const appointments = await db.query(`SELECT * FROM appointment WHERE id = ?`, [+id]);
    
            if(appointments.length < 1) return res.status(400).json({ok: false, message: 'Appointment not found'});
            
            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            res.status(404).json({ok: false, message: 'Something went wrong'});
        }
    }

    public async edit(req: Request, res: Response) {
        
    }
    
    /**Funcioin que recibe un producto en el body u su id en la cabecera 
     * Actualiza el producto almacenado en el id con los nuevos datos.
     * Si no encuentra devuelve error
    */
    public async update (req: Request, res: Response) {
        
    }

    public async destroy (req: Request, res: Response) {
        
        const id = req.params.id;

        try {

            const response = await db.query(`DELETE FROM appointment WHERE id = ?`, [+id]);

            console.log(response);
            if(response.affectedRows < 1 ) res.status(400).json({ok: false, message: 'No appointmens found'}); 

            res.status(200).json({ok: true, message: 'Appointment deleted'});

        } catch (error){
            console.log(error);
            res.status(200).json({ok: false, message: 'Something went wrong'});
        }

    }

}


export const appointmentController = new AppointmentController();