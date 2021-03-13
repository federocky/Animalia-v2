import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class ProductsController {

    public async index (req: Request, res: Response) {
        //const products = await db.query('SELECT * FROM product');

        const products = await db.query(`SELECT  p.* , AVG(pr.rating) AS rating_average,  COUNT(pr.rating) AS number_votes
                                            FROM product p
                                            LEFT JOIN product_rating pr
                                            ON pr.product_id = p.id
                                            WHERE p.active = 1
                                            GROUP BY p.id`);

        
        res.status(200).json({ok:true, data: products});

        //TODO: meter control errores
    }
    
    public async store (req: Request, res: Response) {
    
    }

    public async show (req: Request, res: Response) {

    }

    public async update (req: Request, res: Response) {

    }

    public async destroy (req: Request, res: Response) {

    }

}


export const productsController = new ProductsController();