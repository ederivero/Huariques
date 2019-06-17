"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// USUARIO ROUTER
const usuario_1 = require("../controllers/usuario");
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
exports.usuario_router = express_1.Router();
exports.usuario_router.post('/usuario/crear', multer.single('imagen'), usuario_1.usuario_control.create);
exports.usuario_router.post('/usuario/login', usuario_1.usuario_control.login);
exports.usuario_router.get('/usuario/traertodos', usuario_1.usuario_control.getAll);
exports.usuario_router.get('/usuario/traerporcorreo/:correo', usuario_1.usuario_control.getByEmail);
exports.usuario_router.get('/usuario/traerporid/:id', usuario_1.usuario_control.getById);
exports.usuario_router.put('/usuario/actualizar/:id', multer.single('imagen'), usuario_1.usuario_control.upDateById);
