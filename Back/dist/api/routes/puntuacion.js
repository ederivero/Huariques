"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// PUNTUACION ROUTER
const puntuacion_1 = require("../controllers/puntuacion");
const express_1 = require("express");
exports.puntuacion_router = express_1.Router();
exports.puntuacion_router.post('/puntuacion/crear', puntuacion_1.puntuacion_control.create);
exports.puntuacion_router.get('/puntuacion/mostrar/:id_cliente', puntuacion_1.puntuacion_control.mostrar);
