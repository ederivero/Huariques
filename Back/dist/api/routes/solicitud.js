"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// SOLICITUD ROUTER
const solicitud_1 = require("../controllers/solicitud");
const express_1 = require("express");
exports.solicitud_router = express_1.Router();
exports.solicitud_router.post('/solicitud/crear', solicitud_1.solicitud_control.create);
exports.solicitud_router.delete('/solicitud/borrar', solicitud_1.solicitud_control.delete);
