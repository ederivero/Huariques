"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// CATEGORIA ROUTER
const categoria_1 = require("../controllers/categoria");
const express_1 = require("express");
exports.categoria_router = express_1.Router();
exports.categoria_router.post('/categoria/crear', categoria_1.categoria_control.create);
exports.categoria_router.get('/categoria/traertodos', categoria_1.categoria_control.getAll);
exports.categoria_router.get('/categoria/encontrar/:palabra', categoria_1.categoria_control.findByLike);
exports.categoria_router.get('/categoria/encontrarporid/:id', categoria_1.categoria_control.findById);
