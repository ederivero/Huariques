"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// USUARIO ROUTER
const usuario_1 = require("../controllers/usuario");
const express_1 = require("express");
exports.usuario_router = express_1.Router();
exports.usuario_router.post('/usuario/crear', usuario_1.usuario_control.create);
exports.usuario_router.get('/usuario/traertodos', usuario_1.usuario_control.getAll);
exports.usuario_router.get('/usuario/traerporcorreo/:correo', usuario_1.usuario_control.getByEmail);
exports.usuario_router.put('/usuario/actualizar/:id', usuario_1.usuario_control.upDateById);
