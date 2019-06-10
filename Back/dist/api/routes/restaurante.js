"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RESTAURANTE ROUTER
const restaurante_1 = require("../controllers/restaurante");
const express_1 = require("express");
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './images' });
exports.restaurante_router = express_1.Router();
// restaurante_router.post('/restaurante/crear',multipartMiddleware,restaurante_control.create);
exports.restaurante_router.post('/restaurante/crear', restaurante_1.restaurante_control.create);
exports.restaurante_router.put('/restaurante/actualizar/:prod_id', restaurante_1.restaurante_control.upDateById);
exports.restaurante_router.get('/restaurante/traertodos', restaurante_1.restaurante_control.getAll);
exports.restaurante_router.get('/restaurante/borrar/:rest_id', restaurante_1.restaurante_control.deleteById);
exports.restaurante_router.get('/restaurante/encontrar/:palabra', restaurante_1.restaurante_control.findByLike);
exports.restaurante_router.get('/restaurante/getImagenByName/:name', restaurante_1.restaurante_control.getImagenByName);
//AGREGAR
exports.restaurante_router.get('/restaurante/getById/:id', restaurante_1.restaurante_control.getById);
