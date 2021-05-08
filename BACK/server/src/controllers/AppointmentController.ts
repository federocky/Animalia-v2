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

            const id = req.params.id;
            const date: Date = req.body.date; 
            
            //TODO: castear la date a solo date si la mando completa o mandarla ya casteada

            try{
                const appointments = await db.query(`SELECT date_appointment_from, date_appointment_from 
                                                     FROM appointment WHERE DATE(date_appointment_from) = ?
                                                     AND service_id = ?`, [+date, id]);
        
                /**si no encuentra ningún appointment devolvemos el resultado*/
                if (appointments.length < 1) return res.status(200).json({ok: false, message: 'The user has no appointments'});

                res.status(200).json({ok:true, data: appointments});
    
            } catch(error){
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
        const {service_id, date_appointment_from, date_appointment_to, address_id, price } = req.body;


        try{
            
            const response = db.query(`INSERT INTO appointment (service_id, date_appointment_from, date_appointment_to
                                        user_id, price, address_id ) values (?,?,?,?,?,?)`, 
                                        [service_id, date_appointment_from, date_appointment_to, user_id, address_id]);

            ///TODO: mirar el tema de los errores y tal
            res.status(200).json({ok: true, order_id: response.insertId});

        } catch (error){
            console.log(error);
            //TODO: aqui irial el rollback() y devolver el stock de los productos.
            
            res.status(400).json({ok: false});
        }

    } 

    

    /**devuelve un producto por id asi como su rating y numero de votos */
    public async show (req: Request, res: Response) {
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

    }


    public async changeState( req: Request, res: Response) {

        const state = req.body.state;
        const id = req.params.id;

        let date = '';

        if( !id || !state ) return res.status(400).json({ok: false, message: 'Invalid parameters', code: 1});

       
        
        if( state != 'sent' && state != 'delivered') return res.status(400).json({ok: false, message: 'Invalid state', code: 2});

        try {

            let response;

            if(state == 'sent') response = await db.query(`UPDATE delivery SET state = ?, date_sent = curdate() WHERE id = ?`, [state, +id]);
            else if( state == 'delivered') response = await db.query(`UPDATE delivery SET state = ?, date_delivered = curdate() WHERE id = ?`, [state, +id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});
    
            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Item not found", code: 3});

        } catch (error) {
            console.log(error);
            return res.status(400).json({ok: false, message: "Connection error", code: 4});
        }

    }

    public async reverseState( req: Request, res: Response) {

        const state = req.body.state;
        const id = req.params.id;

        let date = '';    

        if( !id || !state ) return res.status(400).json({ok: false, message: 'Invalid parameters', code: 1});

       
        
        if( state != 'ordered' && state != 'sent') return res.status(400).json({ok: false, message: 'Invalid state', code: 2});

        try {

            let response;

            if(state == 'ordered') response = await db.query(`UPDATE delivery SET state = ?, date_sent = null WHERE id = ?`, [state, +id]);
            else if( state == 'sent') response = await db.query(`UPDATE delivery SET state = ?, date_delivered = null WHERE id = ?`, [state, +id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});
    
            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Item not found", code: 3});

        } catch (error) {
            console.log(error);
            return res.status(400).json({ok: false, message: "Connection error", code: 4});
        }

    }

}

/**Funcion en la que actualizamos el stock de los productos comprados. */
async function updateStock( user_id: number, cart: Cart): Promise<boolean>{

    //TODO: esto deberia ser una transacción.

    if(!await recorreProducto(user_id, cart)) return false;

    //TODO:aqui iria la confirmacion de la transaccion

    return true;

}


async function recorreProducto(user_id: number, cart: Cart) {

    let stock;

    ///cart.productQty.forEach( async (element: ProductQty) => {
    for ( const element of cart.productQty){    

        console.log(element);
        try{
            //recogemos el stock de cada producto
            stock = await db.query(`SELECT stock FROM product WHERE id = ?`, [element.product.id]);
            
            /*la consulta nos devuelve un array de RowDataPacket por lo que accedemos a la 
            primera posicion y propiedad stock*/
            stock = stock[0].stock;
            
            //si el stock es menor que la cantidad lanzamos error.
            if(stock < element.qty)  throw new Error('Invalid stock');
            
            //actualizamos el stock en la BBDD
            await db.query(`UPDATE product SET stock = ? where id = ?`, [stock - element.qty, element.product.id]);

        } catch (error){

            //TODO:aqui iria el rollback de la transaccion.

            return false;

        }
    };

    return true;
}

/**Funcion que carga toda la información de los productos pertenecientes a un pedido. */
async function loadProductInfo(order: Order){

    let productAux: Product[];
    for (const product of order.details){
    
        productAux = await db.query(`SELECT * FROM product WHERE id = ?`, [product.id]);

        product.product = productAux[0];
    }

    return order;
    
}


export const orderController = new OrderController();