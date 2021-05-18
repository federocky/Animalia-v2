import { Appointment } from './../models/appointment.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';
import { Address } from '../models/address.model';

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

        const id = req.user_id;

        try{
            const appointments = await db.query(`SELECT appointment.*, service.name, address.street_name, address.street_number,
                                                address.postcode, address.floor, address.letter, address.town, address.locality
                                                 FROM service 
                                                 JOIN appointment on service.id = appointment.service_id
                                                 JOIN address on appointment.address_id = address.id
                                                 WHERE appointment.user_id = ?
                                                 ORDER BY appointment.date_appointment_from`, [+id]);
    
            /**si no encuentra ningún appointment devolvemos el resultado*/
            if (appointments.length < 1) return res.status(200).json({ok: false, message: 'The user has no appointments'});
            
        

            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            console.log(error);
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }


    /**devuelve hora de inicio y fin de las citas en una fecha determinada de un determinado servicio */
    public async indexByDate (req: Request, res: Response) {

        const date: string = req.body.date; 
        const service: string = req.body.service;

        if(!date || !service)return res.status(400).json({ok: false, message: 'Invalid info'});
        
        //TODO: castear la date a solo date si la mando completa o mandarla ya casteada

        try{
            
            let response = await db.query(`SELECT DATE_FORMAT(hour_start, '%H:%i') AS hour_from, DATE_FORMAT(hour_end, '%H:%i') AS hour_to FROM service WHERE name = ?`, [service]);
            
            let from:           string = response[0].hour_from;
            let to:             string = response[0].hour_to;

                        
            from = from.slice(0, 2);
            to = to.slice(0,2);
            
            let numberFrom: number = +from;
            let numberTo: number = +to;
            
            let serviceHours:    number[] = [];
            let bookedHours:     number[] = [];
            let availableHours:  number[] = [];

            const formatedDate = new Date(date);

            if(isToday( formatedDate )) {
                const hourNow = new Date().getHours();

                if(hourNow >= 19) return res.status(200).json({ok: true, data: []});
                numberFrom = hourNow + 1;
            }
            

            for(let i = numberFrom; i <= numberTo; i++){
                serviceHours.push(i);
            }

            response = await db.query(`SELECT DATE_FORMAT(date_appointment_from, '%H:%i') AS hour_from, DATE_FORMAT(date_appointment_to, '%H:%i') AS hour_to
                                                    FROM appointment WHERE date_appointment_from LIKE  ?
                                                    ORDER BY hour_from`, [date+'%']);
    
                   
            //if no appointments all the hours are available
            if (response.length < 1) return res.status(200).json({ok: true, data: serviceHours});

            let bookedFrom: string;

            response.forEach( (elem:any) => {
                bookedFrom       = elem.hour_from;    
                bookedFrom       = bookedFrom.slice(0,2);
                bookedHours.push(+bookedFrom);
            });
            
            
            let count = 0;
            for(let i = 0; i < serviceHours.length; i++){
                count = 0;
                for(let j = 0; j < bookedHours.length; j++){
                    if(serviceHours[i] == bookedHours[j]) count++;
                }
                if(count < 2) availableHours.push(serviceHours[i]);
                else i++;
            }


            res.status(200).json({ok:true, data: availableHours});

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

function isToday (someDate : Date) {

    const today = new Date()
    return  someDate.getDate() == today.getDate() &&
            someDate.getMonth() == today.getMonth() &&
            someDate.getFullYear() == today.getFullYear();
}


export const appointmentController = new AppointmentController();