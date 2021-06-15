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
        this.router.post('/', tokenValidation, orderController.store);
        this.router.get('/user/:id', tokenValidation, orderController.indexByUser);
        this.router.post('/delivery/:id', orderController.changeState);
        this.router.post('/deliveryReverse/:id', orderController.reverseState);
    }
}

const orderRoutes = new OrderRoutes();
export default orderRoutes.router;