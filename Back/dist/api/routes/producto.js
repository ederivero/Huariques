"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// PRODUCTOR ROUTER
const producto_1 = require("../controllers/producto");
const express_1 = require("express");
exports.producto_router = express_1.Router();
exports.producto_router.post('producto/crear', producto_1.producto_control.create);
exports.producto_router.put('producto/:prod_id', producto_1.producto_control.upDateById);
exports.producto_router.get('producto', producto_1.producto_control.getAll);
exports.producto_router.get('producto/:prod_id', producto_1.producto_control.getById);
exports.producto_router.get('producto/:palabra', producto_1.producto_control.findByLike);
