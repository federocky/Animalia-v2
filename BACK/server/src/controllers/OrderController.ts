import { Cart } from './../models/cart.model';
import { ProductQty } from './../models/productQty.model';
import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class OrderController {

    /**devuelve todos los productos con su rating y numero de votos. */
    public async index (req: Request, res: Response) {

    }

    public async create(req: Request, res: Response) {
        
    }
    

    public async store (req: Request, res: Response) {
        
        //recibimos el desencriptado del token
        const user_id = req.user_id;

        //TODO:validacion al carro???
        //recibimos la direccion de envío y el carro
        const address_id = req.body.address_id;
        const cart: Cart = req.body.cart;


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

    /**Funcion que actualiza el stock cuando el cliente se dispone a pagar un pedido */
    public async updateStock(req: Request, res: Response){

        //recibimos el desencriptado del token
        const user_id = req.user_id;

        //recibimos el carro
        const cart: Cart = req.body.cart;

        //TODO: esto deberia ser una transacción.
        try{

            let stock;

            cart.productQty.forEach( async (element: ProductQty) => {
                stock = await db.query(`SELECT stock FROM product WHERE id = ?`, [element.product.id]);

                if(stock[0] < element.qty) throw Error;

                await db.query(`UPDATE product SET stock = ? where id = ?`,
                                [element.qty - stock[0], element.product.id]);
            });

        } catch(error){
            console.log(error);
            //aqui iria el rollback de la transaccion.
        }



    }

    /**devuelve un producto por id asi como su rating y numero de votos */
    public async show (req: Request, res: Response) {
    }

    public async edit(req: Request, res: Response) {
        
    }

    public async update (req: Request, res: Response) {

    }

    public async destroy (req: Request, res: Response) {

    }

}


export const orderController = new OrderController();