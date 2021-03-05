"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProductsController_1 = require("../controllers/ProductsController");
class ProductRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', ProductsController_1.productsController.index);
        //this.router.get('/create', productsController.create);
        this.router.post('/', ProductsController_1.productsController.store);
        this.router.get('/:id', ProductsController_1.productsController.show);
        //this.router.get('/edit/:id', productsController.edit);
        this.router.put('/:id', ProductsController_1.productsController.update);
        this.router.delete('/:id', ProductsController_1.productsController.destroy);
    }
}
const productsRoutes = new ProductRoutes();
exports.default = productsRoutes.router;
