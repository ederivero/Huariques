"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// OFERTA ROUTER
const oferta_1 = require("../controllers/oferta");
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
exports.oferta_router = express_1.Router();
exports.oferta_router.post('/oferta/crear', multer.single('imagen'), oferta_1.oferta_control.create);
exports.oferta_router.put('/oferta/actualizar/:prod_id', multer.single('imagen'), oferta_1.oferta_control.update);
