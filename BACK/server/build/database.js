"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_mysql_1 = __importDefault(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const db = promise_mysql_1.default.createPool(keys_1.default.database);
///recuerda que estamos usando la version 3.3.1
//npm i promise-mysql@3.3.1 
db.getConnection()
    .then(connection => {
    db.releaseConnection(connection);
    console.log('DB is connected');
});
exports.default = db;
