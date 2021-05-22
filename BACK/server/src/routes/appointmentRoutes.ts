import { tokenValidation } from './../middlewares/auth.middleware';
import { Router } from 'express';

import { appointmentController } from './../controllers/AppointmentController';


class AppointmentRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', appointmentController.index);
        this.router.get('/byUser', tokenValidation, appointmentController.indexByUser);
        this.router.post('/byDate', appointmentController.indexByDate);
        //this.router.get('/create', appointmentController.create);
        this.router.post('/', appointmentController.store);
        this.router.post('/asignEmployee', appointmentController.asignEmployee);
        this.router.get('/:id', appointmentController.show);
        //this.router.get('/edit/:id', appointmentController.edit);
        //this.router.put('/:id', appointmentController.update); 
        this.router.delete('/:id', appointmentController.destroy);
        //this.router.get('/recover/:id', appointmentController.unDestroy);
    }
}

const appointmentRoutes = new AppointmentRoutes();
export default appointmentRoutes.router;
