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
        this.router.post('/', appointmentController.store);
        this.router.post('/asignEmployee', appointmentController.asignEmployee);
        this.router.post('/cancelEmployee', appointmentController.cancelEmployeeAsign);
        this.router.get('/:id', appointmentController.show);
        this.router.delete('/:id', appointmentController.destroy);
    }
}

const appointmentRoutes = new AppointmentRoutes();
export default appointmentRoutes.router;
