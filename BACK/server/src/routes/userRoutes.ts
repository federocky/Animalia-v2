import { Router } from 'express';

import { userController } from '../controllers/UserController';

import { tokenValidation } from '../middlewares/auth.middleware';
import { userValidation } from '../middlewares/user.middleware';
import { addressValidation } from '../middlewares/address.middleware';

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
        this.router.put('/:id', tokenValidation, userValidation, userController.update);
        this.router.put('/password/:id', tokenValidation, userController.updatePassword); 
        this.router.delete('/:id', userController.destroy);
        this.router.get('/recover/:id', userController.unDestroy);

        this.router.get('/address/:id', tokenValidation, userController.showAddress);
        this.router.post('/address', tokenValidation, addressValidation, userController.storeAddress);
        this.router.put('/address/:id', tokenValidation, addressValidation, userController.updateAddress);
        this.router.post('/address/:id', tokenValidation, userController.setAddressAsMain);
        this.router.delete('/address/:id', tokenValidation, userController.destroyAddress);
        this.router.get('/address/index/get', tokenValidation, userController.indexAddressByUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;