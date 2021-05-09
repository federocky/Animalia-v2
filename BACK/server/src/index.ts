import express, {Application} from 'express';


//morgan nos da informacion sobre las peticiones
import morgan from 'morgan';


//cors permite recibir peticiones desde otro servidor
import cors from 'cors';


//ARCHIVOS DE RUTAS
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import serviceRoutes from './routes/serviceRoutes';
import appointmentRoutes from './routes/appointmentRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }
    
    config():void {

        //configuro el puerto
        this.app.set('port', process.env.PORT || 3000);

        //doy informacion por console sobre las peticiones
        this.app.use(morgan('dev'));

        //permitimos conectar desde otro servidor
        this.app.use(cors());

        //permitimos al servidor entender json
        this.app.use(express.json());
    }

    routes(): void {
        this.app.use('/api/products', productRoutes);
        this.app.use('/api/auth', authRoutes);
        this.app.use('/api/user', userRoutes);
        this.app.use('/api/order', orderRoutes);
        this.app.use('/api/service', serviceRoutes);
        this.app.use('/api/appointment', appointmentRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`running on port ${this.app.get('port')}`);
        });
    }

}

const server = new Server();
server.start();