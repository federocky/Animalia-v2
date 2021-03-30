import { Router } from 'express';

import { orderController } from './../controllers/OrderController';

class OrderRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', orderController.index);
        this.router.get('/create', orderController.create);
        this.router.post('/', orderController.store);
        this.router.get('/:id', orderController.show);
        this.router.get('/edit/:id', orderController.edit);
        this.router.put('/:id', orderController.update);
        this.router.delete('/:id', orderController.destroy);
    }
}

const orderRoutes = new OrderRoutes();
export default orderRoutes.router;