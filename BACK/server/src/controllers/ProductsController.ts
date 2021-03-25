import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class ProductsController {

    /**devuelve todos los productos con su rating y numero de votos. */
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

    /**devuelve un producto por id asi como su rating y numero de votos */
    public async show (req: Request, res: Response) {
        
        const { id } = req.params;

        const product = await db.query(`SELECT  p.* , AVG(pr.rating) AS rating_average,  COUNT(pr.rating) AS number_votes
                                            FROM product p
                                            LEFT JOIN product_rating pr
                                            ON pr.product_id = p.id
                                            WHERE p.active = 1 AND p.id = ${id}
                                            GROUP BY p.id`);

        //FIXME: me salta en error de cannot set headers after they are sent to the client.
        if (product.length < 1) res.status(404).json({ok: false, message: 'Product not found'});
        
        
        res.status(200).json({ok: true, data: product});

        //TODO: meter control errores
    }

    public async update (req: Request, res: Response) {

    }

    public async destroy (req: Request, res: Response) {

    }

}


export const productsController = new ProductsController();