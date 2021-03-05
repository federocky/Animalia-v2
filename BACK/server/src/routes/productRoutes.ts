import { Router } from 'express';

import { productsController } from '../controllers/ProductsController';

class ProductRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', productsController.index);
        //this.router.get('/create', productsController.create);
        this.router.post('/', productsController.store);
        this.router.get('/:id', productsController.show);
        //this.router.get('/edit/:id', productsController.edit);
        this.router.put('/:id', productsController.update);
        this.router.delete('/:id', productsController.destroy);
    }
}

const productsRoutes = new ProductRoutes();
export default productsRoutes.router;
