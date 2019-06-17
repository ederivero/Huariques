"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// RSTAURANTE CATEGORIA ROUTER
const restCategoria_1 = require("../controllers/restCategoria");
const express_1 = require("express");
exports.restcategoria_router = express_1.Router();
exports.restcategoria_router.post('/restcategoria/crear', restCategoria_1.restcategoria_control.create);
exports.restcategoria_router.get('/restcategoria/rest/:id_rest', restCategoria_1.restcategoria_control.traerRestById);
exports.restcategoria_router.get('/restcategoria/cat/:id_cat', restCategoria_1.restcategoria_control.traerCatById);
exports.restcategoria_router.delete('/restcategoria/eliminar', restCategoria_1.restcategoria_control.delete);
