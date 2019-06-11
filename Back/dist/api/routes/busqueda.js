"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// BUSQUEDA ROUTER
const busqueda_1 = require("../controllers/busqueda");
const express_1 = require("express");
exports.busqueda_router = express_1.Router();
exports.busqueda_router.post('/busqueda/crear', busqueda_1.busqueda_control.create);
exports.busqueda_router.get('/busqueda/encontrar/:id_usu', busqueda_1.busqueda_control.findById);
