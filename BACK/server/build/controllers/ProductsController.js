"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsController = void 0;
//traemos la bbdd
const database_1 = __importDefault(require("../database"));
class ProductsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield database_1.default.query('SELECT * FROM product');
            res.json({ ok: true, data: products });
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.productsController = new ProductsController();
