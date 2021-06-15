import { Product } from './../models/product.model';
import { json, Request, Response } from 'express';

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
                                                GROUP BY p.id`);
    
            
            res.status(200).json({ok:true, data: products});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }
    


    /**Funcion para guardar un nuevo producto
     * devuelve id de producto o un error.
     */
    public async store (req: Request, res: Response) {
        
        const { ...product }: Product = req.body;

        try{
            const response = await db.query(`INSERT INTO product (name, description, price, brand, stock,
                                           category_id, provider_id, img, active) 
                                           VALUES (?,?,?,?,?,?,?,?,?)`, 
                                           [product.name, product.description, product.price,
                                            product.brand, product.stock, product.category_id,
                                            product.provider_id, product.img, product.active]);

            res.status(200).json({ok: true, data: response.insertId });

        } catch (error) {
            res.status(400).json({ok: false, message: 'Connection error'});
        }
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
            

            /**si no encuentra ningún producto devolvemos el error */            
            if (product.length < 1) return res.status(404).json({ok: false, message: 'Product not found'});
                
            
            res.status(200).json({ok: true, data: product});

        }catch(error){

            if(error.errno == 1054) {
                return res.status(404).json({ok: false, message: 'Incorrect parameters'});
            }
            
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }



    /**Funcioin que recibe un producto en el body u su id en la cabecera 
     * Actualiza el producto almacenado en el id con los nuevos datos.
     * Si no encuentra devuelve error
    */
    public async update (req: Request, res: Response) {

        const { ...product }: Product = req.body;
        const { id } = req.params;
        
        try{
            const response = await db.query(`UPDATE product SET name = ?, description = ?,
                                             price = ?, brand = ?, stock = ?,
                                             category_id = ?, provider_id = ?, img = ?,
                                             active = ?
                                             WHERE id = ?`, 
                                           [product.name, product.description, product.price,
                                            product.brand, product.stock, product.category_id,
                                            product.provider_id, product.img, product.active, +id]);

            if( response.affectedRows > 0) return res.status(200).json({ok: true, data: product });

            //si no encuentra el producto manda el error
            return res.status(400).json({ok: false, message: "Item not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }


    /**Funcion que elimina un producto por id */
    public async destroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE product SET active = 0 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Item not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }

    /**Funcion que recupera un producto por id */
    public async unDestroy (req: Request, res: Response) {
        
        const { id } = req.params;

        try {

            const response = await db.query('UPDATE product SET active = 1 WHERE id = ?', [id]);

            //si encuentra el producto
            if( response.affectedRows > 0 ) return res.status(200).json({ok: true});

            //si no lo encuentra
            return res.status(400).json({ok: false, message: "Item not found", code: 1});

        } catch (error) {
            return res.status(400).json({ok: false, message: "Connection error", code: 2});
        }
    }

    /**Funcion que devuelve todas las categorias */
    public async indexCategory(req: Request, res: Response) {

        try{
            const category = await db.query(`SELECT  * FROM category`);
                
            res.status(200).json({ok:true, data: category});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }

    }

    /**Funcion que devuelve todas las providers */
    public async indexProvider(req: Request, res: Response) {

        try{
            const provider = await db.query(`SELECT  * FROM provider`);
                
            res.status(200).json({ok:true, data: provider});

        } catch(error){
            res.status(404).json({ok: false, message: 'Server not working'});
        }
    }
}


export const productsController = new ProductsController();