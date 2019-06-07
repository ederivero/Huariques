"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RSTAURANTE CATEGORIA ROUTER
const restcategoria_1 = require("../controllers/restcategoria");
const express_1 = require("express");
exports.restcategoria_router = express_1.Router();
exports.restcategoria_router.post('/restcategoria/crear', restcategoria_1.restcategoria_control.create);
exports.restcategoria_router.delete('/restcategoria/eliminar', restcategoria_1.restcategoria_control.delete);
