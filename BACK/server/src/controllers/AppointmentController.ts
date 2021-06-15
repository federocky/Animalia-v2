import { Appointment } from './../models/appointment.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class AppointmentController {

    /**devuelve todas las citas. */
    public async index (req: Request, res: Response) {

        try{
            const appointments = await db.query(`SELECT appointment.*, service.name, address.street_name, address.street_number,
                                                 address.postcode, address.floor, address.letter, address.town, address.locality,
                                                 user.name, user.surname, user.phone 
                                                 FROM service 
                                                 JOIN appointment on service.id = appointment.service_id
                                                 JOIN address on appointment.address_id = address.id
                                                 JOIN user_address on address.id = user_address.address_id
                                                 JOIN user on user_address.user_id = user.id
                                                 ORDER BY date_appointment_from`);
    
            
            res.status(200).json({ok:true, data: appointments});

        } catch(error){
            console.log(error);
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
            if (appointments.length < 1) return res.status(200).json({ok: true, data: appointments,  message: 'The user has no appointments'});
            
        
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
        
        try{
            
            let response = await db.query(`SELECT DATE_FORMAT(hour_start, '%H:%i') AS hour_from, DATE_FORMAT(hour_end, '%H:%i') AS hour_to FROM service WHERE name = ?`, [service]);
            
            let from:     string = response[0].hour_from;
            let to:       string = response[0].hour_to;

            //nos quedamos con la hora, sin minutos            
            from = from.slice(0, 2);
            to = to.slice(0,2);
            
            //casteamos a number
            let numberFrom: number = +from;
            let numberTo: number = +to;
            
            let serviceHours:    number[] = [];
            let bookedHours:     number[] = [];
            let availableHours:  number[] = [];

            const formatedDate = new Date(date);

            if(isToday( formatedDate )) {
                const hourNow = new Date().getHours();

                //si son mas de las 19 no hay mas servicios hoy
                if(hourNow >= 19) return res.status(200).json({ok: true, data: []});
                numberFrom = hourNow + 1;
            }
            
            for(let i = numberFrom; i <= numberTo; i++){
                serviceHours.push(i);
            }

            response = await db.query(`SELECT DATE_FORMAT(date_appointment_from, '%H:%i') AS hour_from, DATE_FORMAT(date_appointment_to, '%H:%i') AS hour_to
                                                    FROM appointment WHERE date_appointment_from LIKE  ?
                                                    ORDER BY hour_from`, [date+'%']);
    
                   
            //sin citas todas las horas estan disponibles.
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

    

    /**Funcion para almacenar una nueva cita. */
    public async store (req: Request, res: Response) {
        
        //recibimos el id desencriptado del token
        const user_id = req.user_id;

        //recibimos los datos del servicio
        const { ...appointment }: Appointment = req.body;

        try{
            const checkAvailability = await db.query(`SELECT id FROM appointment WHERE date_appointment_from = ?`, [appointment.date_appointment_from]);

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

    

    /**devuelve una cita especifica*/
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

    /**Funcion para asignar un empleado a una cita */
    public async asignEmployee(req: Request, res: Response){

        const employee_id: string = req.body.employee_id;
        const appointment_id: string = req.body.appointment_id;
        
        try{

            await db.query(`UPDATE appointment SET employee_id = ? WHERE id = ?`, [employee_id, appointment_id]);

            res.status(200).json({ok: true, message: 'Appointment updated'});

        } catch(error){
            console.log(error);
            res.status(400).json({ok: false, message: 'Something went wrong'});

        }

    }

    public async cancelEmployeeAsign(req: Request, res: Response){

        const appointment_id: string = req.body.appointment_id;

        try{

            await db.query(`UPDATE appointment SET employee_id = null WHERE id = ?`, [appointment_id]);

            res.status(200).json({ok: true, message: 'Appointment updated'});

        } catch(error){
            console.log(error);
            res.status(400).json({ok: false, message: 'Something went wrong'});

        }
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