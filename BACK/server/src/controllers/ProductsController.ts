import { Request, Response } from 'express';

//traemos la bbdd
import db from '../database';

class ProductsController {

    public async index (req: Request, res: Response) {
        const products = await db.query('SELECT * FROM games');
        
        res.json({ok:true, data: products});
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