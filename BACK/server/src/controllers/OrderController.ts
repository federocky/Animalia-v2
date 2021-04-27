import { Delivery } from './../models/delivery.model';
import { Order } from './../models/order.model';
import { Cart } from './../models/cart.model';
import { ProductQty } from './../models/productQty.model';
import { Product } from '../models/product.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class OrderController {

    /**devuelve todos los productos con su rating y numero de votos. */
    public async index (req: Request, res: Response) {

        try{

            const orders: Order[] = await db.query(`SELECT * FROM orders`);
    
            /**Funcion que por cada pediido carga sus productos
             * tenemos que poner la funcion asi porque si no no funciona la asincronia.
             */
             async function loadInfo() {

                let delivery;
                
                for (const order of orders){

                    order.details =  await db.query(`SELECT * FROM order_details
                                                    WHERE order_id = ?`, [order.id]);     
                    
                    delivery = await db.query(`SELECT * FROM delivery WHERE order_id = ?`,[order.id]);

                    order.delivery = delivery[0];

                    await loadProductInfo(order);
                }
            }

            await loadInfo();
            
            res.status(200).json({ok:true, data: orders});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }

    public async create(req: Request, res: Response) {
        
    }
    
    /**Funcion que recibe un carro y una direccion asi como el usuario encriptado en el token
     * Se comprueba si el stock es correcto. De ser asi se guarda el pedido y actualiza el stock
     * si el stock es incorrecto se devuelve el error.
     */
    public async store (req: Request, res: Response) {
        
        //recibimos el desencriptado del token
        const user_id = req.user_id;

        //TODO:validacion al carro???
        //recibimos la direccion de envío y el carro
        const address_id = req.body.address_id;
        const cart: Cart = req.body.cart;


        //comprobamnos y actualizamos el stock de los productos
        if(!await updateStock(user_id, cart)) return res.status(400).json({ok:false, message: 'Invalid stock'});


        //TODO: esto deberia ser una transaction, pero esta complicada la cosa.

        try{
        const response = await db.query(`INSERT INTO orders (user_id, address_id, total) VALUES (?,?,?)`, 
                                    [user_id, address_id, cart.total]);
        
        cart.productQty.forEach( async (element: ProductQty) => {
            await db.query(`INSERT INTO order_details (order_id, product_id, qty, price) 
                            VALUES (?,?,?, ?)`, 
                            [response.insertId, element.product.id, element.qty, element.product.price]);

        });

        await db.query('INSERT INTO delivery (order_id) VALUES (?)', [response.insertId]);

        res.status(200).json({ok: true, order_id: response.insertId});

        } catch (error){
            res.status(400).json({ok: false});
            console.log(error);
        
            //TODO: aqui irial el rollback() y devolver el stock de los productos.
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

    /**Funcion que devuelve todos los pedidos de un usuario */
    public async indexByUser( req: Request, res: Response){

        //recibimos el id encriptado jwt
        const id = req.user_id;
    
        try{
    
            const orders: Order[] = await db.query(`SELECT * FROM orders where user_id = ?`, [id]);
    
            /**Funcion que por cada pediido carga su informacion
             */
            async function loadInfo() {
    
                for (let order of orders){
    
                    order.details =  await db.query(`SELECT * FROM order_details
                                                    WHERE order_id = ?`, [order.id]);     
                    
                    order.delivery = await db.query(`SELECT * FROM delivery WHERE order_id = ?`,[order.id])
                    
                    await loadProductInfo(order);
                }
            }
    
            await loadInfo();
            
            res.status(200).json({ok:true, data: orders});
    
        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
            console.log(error);
        }
    
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

    let stock;

    /**he tenido que meter esta funcion dentro de la funcion para que 
     * pueda funciona bien el bucle asincrono, de otro modo me daba error.
     */
    async function recorreProducto() {

        ///cart.productQty.forEach( async (element: ProductQty) => {
        for ( const element of cart.productQty){    

            console.log('entramos al bucle');

            try{
                //recogemos el stock de cada producto
                stock = await db.query(`SELECT stock FROM product WHERE id = ?`, [element.product.id]);
                
                /*la consulta nos devuelve un array de RowDataPacket por lo que accedemos a la 
                primera posicion y propiedad stock*/
                stock = stock[0].stock;
                
                
                //si el stock es menor que la cantidad lanzamos error.
                if(stock < element.qty)  throw new Error('Invalid stock');
                
                
                //actualizamos el stock en la BBDD
                await db.query(`UPDATE product SET stock = ? where id = ?`,
                [stock - element.qty, element.product.id]);
                
            }catch (error){
                console.log(error);
                console.log('confirmo que estoy en catch');
                return false;
                //TODO:aqui iria el rollback de la transaccion.
            }
        };
    }

    if(!await recorreProducto())return false;

    //TODO:aqui iria la confirmacion de la transaccion
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