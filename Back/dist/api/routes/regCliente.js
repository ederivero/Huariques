"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// REGISTRO CLIENTE ROUTER
const regcliente_1 = require("../controllers/regcliente");
const express_1 = require("express");
exports.regcliente_router = express_1.Router();
exports.regcliente_router.post('/regcli/crear', regcliente_1.regcliente_control.create);
exports.regcliente_router.get('/regcli/encontrarporrest/:id_rest', regcliente_1.regcliente_control.findByRestaurante);
exports.regcliente_router.get('/regcli/encontrarporusurest/:id_usu/id_rest', regcliente_1.regcliente_control.findByRestauranteAndUsuario);
exports.regcliente_router.get('/regcli/encontrarporusu/:id_usu', regcliente_1.regcliente_control.findByUsuario);
