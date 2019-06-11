"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// OFERTA ROUTER
const oferta_1 = require("../controllers/oferta");
const express_1 = require("express");
exports.oferta_router = express_1.Router();
exports.oferta_router.post('/oferta/crear', oferta_1.oferta_control.create);
exports.oferta_router.put('/oferta/actualizar/:prod_id', oferta_1.oferta_control.update);
