import { Router } from 'express';

import { serviceController } from './../controllers/ServiceController';


class ServiceRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', serviceController.index);
        //this.router.get('/create', serviceController.create);
        //this.router.post('/', serviceController.store);
        this.router.get('/:id', serviceController.show);
        //this.router.get('/edit/:id', serviceController.edit);
        this.router.put('/:id', serviceController.update);
        this.router.delete('/:id', serviceController.destroy);
        this.router.get('/recover/:id', serviceController.unDestroy);
    }
}

const serviceRoutes = new ServiceRoutes();
export default serviceRoutes.router;
