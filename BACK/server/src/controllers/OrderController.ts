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
        
        const user_id = req.body.user_id;
        const address_id = req.body.address_id;

        const order = req.body.cart;

        try{
            const response = await db.query(`INSERT INTO orders (user_id, address_id, total) VALUES (?,?,?)`, 
                                        [user_id, address_id, order.total]);
            
            order.productQty.forEach( async (element: ProductQty) => {
                await db.query(`INSERT INTO order_details (order_id, product_id, qty, price) 
                                VALUES (?,?,?, ?)`, 
                                [response.insertId, element.product.id, element.qty, element.product.price]);
            });

            await db.query('INSERT INTO delivery (order_id) VALUES (?)', [response.insertId]);

            res.status(200).json({ok: true, order_id: response.insertId});

        } catch (error){
            res.status(400).json({ok: false});
            console.log(error);
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