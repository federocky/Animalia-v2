import { Router } from 'express';

import { productsController } from '../controllers/ProductsController';

//middleware
import { productValidation } from '../middlewares/product.middleware';

class ProductRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productsController.index);
        //this.router.get('/create', productsController.create);
        this.router.post('/', productValidation ,productsController.store);
        this.router.get('/:id', productsController.show);
        //this.router.get('/edit/:id', productsController.edit);
        this.router.put('/:id', productValidation ,productsController.update);
        this.router.delete('/:id', productsController.destroy);
        this.router.get('/recover/:id', productsController.unDestroy);
    }
}

const productsRoutes = new ProductRoutes();
export default productsRoutes.router;
