"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//morgan nos da informacion sobre las peticiones
const morgan_1 = __importDefault(require("morgan"));
//cors permite recibir peticiones desde otro servidor
const cors_1 = __importDefault(require("cors"));
//ARCHIVOS DE RUTAS
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //configuro el puerto
        this.app.set('port', process.env.PORT || 3000);
        //doy informacion por console sobre las peticiones
        this.app.use(morgan_1.default('dev'));
        //permitimos conectar desde otro servidor
        this.app.use(cors_1.default());
        //permitimos al servidor entender json
        this.app.use(express_1.default.json());
    }
    routes() {
        this.app.use('/api/products', productRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`running on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();
