"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RESTAURANTE ROUTER
const restaurante_1 = require("../controllers/restaurante");
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
exports.restaurante_router = express_1.Router();
exports.restaurante_router.post('/restaurante/crear', multer.single('imagen'), restaurante_1.restaurante_control.create);
exports.restaurante_router.put('/restaurante/actualizar/:prod_id', multer.single('imagen'), restaurante_1.restaurante_control.upDateById);
exports.restaurante_router.get('/restaurante/traertodos', restaurante_1.restaurante_control.getAll);
exports.restaurante_router.get('/restaurante/borrar/:rest_id', restaurante_1.restaurante_control.deleteById);
exports.restaurante_router.get('/restaurante/encontrar/:palabra', restaurante_1.restaurante_control.findByLike);
exports.restaurante_router.get('/restaurante/getImagenByName/:name', restaurante_1.restaurante_control.getImagenByName);
exports.restaurante_router.get('/restaurante/getByUsuId/:usu_id', restaurante_1.restaurante_control.getByUsuId);
exports.restaurante_router.get('/restaurante/getById/:id', restaurante_1.restaurante_control.getById);
