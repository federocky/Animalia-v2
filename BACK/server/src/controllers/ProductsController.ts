import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class ProductsController {

    /**devuelve todos los productos con su rating y numero de votos. */
    public async index (req: Request, res: Response) {

        try{
            const products = await db.query(`SELECT  p.* , AVG(pr.rating) AS rating_average,  COUNT(pr.rating) AS number_votes
                                                FROM product p
                                                LEFT JOIN product_rating pr
                                                ON pr.product_id = p.id
                                                WHERE p.active = 1
                                                GROUP BY p.id`);
    
            
            res.status(200).json({ok:true, data: products});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }
    
    public async store (req: Request, res: Response) {
    
    } 

    /**devuelve un producto por id asi como su rating y numero de votos */
    public async show (req: Request, res: Response) {
        
        const { id } = req.params;

        try{
            const product = await db.query(`SELECT  p.* , AVG(pr.rating) AS rating_average,  COUNT(pr.rating) AS number_votes
                                                FROM product p
                                                LEFT JOIN product_rating pr
                                                ON pr.product_id = p.id
                                                WHERE p.active = 1 AND p.id = ${id}
                                                GROUP BY p.id`);
            

            /**si no encuentra ningún producto devolvemos el error
             * el return es necesario para evitar error ERR_HTTP_HEADERS_SENT*/            
            if (product.length < 1) {

                res.status(404).json({ok: false, message: 'Product not found'});
                return;
            }
            
            res.status(200).json({ok: true, data: product});

        }catch(error){

            if(error.errno == 1054) {
                res.status(404).json({ok: false, message: 'Incorrect parameter'});
                return;
            }
            
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }

    public async update (req: Request, res: Response) {

    }

    public async destroy (req: Request, res: Response) {

    }

}


export const productsController = new ProductsController();