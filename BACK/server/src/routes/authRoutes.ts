import { Router } from 'express';

//controladores
import { authController } from '../controllers/AuthController';

//middlewares
import { userValidation } from '../middlewares/user.middleware';

class AuthRoutes {

    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void {
        this.router.post('/signup', userValidation, authController.signUp);
        this.router.post('/signin', authController.signIn);
        this.router.post('/employeeSignup', authController.employeeSignUp);
        this.router.post('/employeeSignin', authController.employeeSignIn);
    }

}

const authRoutes = new AuthRoutes();
export default authRoutes.router;