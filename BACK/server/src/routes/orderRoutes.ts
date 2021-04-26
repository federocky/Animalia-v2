import { Router } from 'express';

//controllers
import { orderController } from './../controllers/OrderController';

//middlewares
import { tokenValidation } from '../middlewares/auth.middleware';


class OrderRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', orderController.index);
        this.router.get('/create', orderController.create);
        this.router.post('/', tokenValidation, orderController.store);
        this.router.get('/:id', orderController.show);
        this.router.get('/edit/:id', orderController.edit);
        this.router.put('/:id', orderController.update);
        this.router.delete('/:id', orderController.destroy);

        this.router.get('/user/:id', tokenValidation, orderController.indexByUser);
        this.router.post('/delivery/:id', orderController.changeState);
    }
}

const orderRoutes = new OrderRoutes();
export default orderRoutes.router;