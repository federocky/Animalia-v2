import { Router } from 'express';

import { userController } from '../controllers/UserController';

class UserRoutes {

    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', userController.index);
        //this.router.get('/create', userController.create);
        this.router.post('/', userController.store);
        this.router.get('/:id', userController.show);
        //this.router.get('/edit/:id', userController.edit);
        this.router.put('/:id', userController.update);
        this.router.delete('/:id', userController.destroy);

        this.router.get('/address/:id', userController.getAddress);
        this.router.put('/address/:id', userController.setAddress);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;