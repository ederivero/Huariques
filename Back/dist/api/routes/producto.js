"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// PRODUCTOR ROUTER
const producto_1 = require("../controllers/producto");
const express_1 = require("express");
//libreria que ayuda a los req.file npm i multer
const Multer = require('multer');
//se le da atributos que guarden en la memory storage y que tenga un limite de archivo en este caso de 5mb (el tamaño es en bytes)
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});
exports.producto_router = express_1.Router();
exports.producto_router.post('/producto/crear', multer.single('imagen'), producto_1.producto_control.create);
exports.producto_router.put('/producto/actualizar/:prod_id', producto_1.producto_control.upDateById);
exports.producto_router.get('/producto/traertodos', producto_1.producto_control.getAll);
exports.producto_router.get('/producto/porId/:prod_id', producto_1.producto_control.getById);
exports.producto_router.get('/producto/porPalabra/:palabra', producto_1.producto_control.findByLike);
exports.producto_router.get('/producto/porIdRest/:rest_id', producto_1.producto_control.getByIdRest);
