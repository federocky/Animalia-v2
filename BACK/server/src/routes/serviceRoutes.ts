import { Router } from 'express';

import { serviceController } from './../controllers/ServiceController';


class ServiceRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', serviceController.index);
        this.router.get('/:id', serviceController.show);
        this.router.put('/:id', serviceController.update);
        this.router.delete('/:id', serviceController.destroy);
        this.router.get('/recover/:id', serviceController.unDestroy);
        this.router.get('/postCodes/index', serviceController.indexPostcode);
    }
}

const serviceRoutes = new ServiceRoutes();
export default serviceRoutes.router;
