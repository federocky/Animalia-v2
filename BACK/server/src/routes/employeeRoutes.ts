import { Router } from 'express';

import { employeeController } from '../controllers/employeeController';

import { employeeValidation } from '../middlewares/auth.middleware';

class EmployeeRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', employeeValidation, employeeController.index);
        //this.router.get('/create', employeeController.create);
        //this.router.post('/', employeeController.store);
        this.router.get('/:id', employeeValidation, employeeController.show);
        //this.router.get('/edit/:id', employeeController.edit);
        this.router.put('/:id', employeeValidation, employeeController.update);
        this.router.delete('/:id', employeeValidation, employeeController.destroy);
        this.router.get('/recover/:id', employeeValidation, employeeController.unDestroy);
    }
}

const employeeRoutes = new EmployeeRoutes();
export default employeeRoutes.router;