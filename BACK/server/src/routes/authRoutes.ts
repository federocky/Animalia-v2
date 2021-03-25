import { Router } from 'express';

import { authController } from '../controllers/AuthController';

class AuthRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/signup', authController.signUp);
        this.router.post('/signin', authController.signIn);
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;