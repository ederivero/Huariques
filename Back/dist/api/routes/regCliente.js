"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// REGISTRO CLIENTE ROUTER
const regCliente_1 = require("../controllers/regCliente");
const express_1 = require("express");
exports.regcliente_router = express_1.Router();
exports.regcliente_router.post('/regcli/crear', regCliente_1.regcliente_control.create);
exports.regcliente_router.get('/regcli/encontrarporrest/:id_rest', regCliente_1.regcliente_control.findByRestaurante);
exports.regcliente_router.get('/regcli/encontrarporusurest/:id_usu/:id_rest', regCliente_1.regcliente_control.findByRestauranteAndUsuario);
exports.regcliente_router.get('/regcli/encontrarporusu/:id_usu', regCliente_1.regcliente_control.findByUsuario);
