"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./api/config/sequelize");
var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3000;
var app = express();
app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto 3000");
    sequelize_1.sequelize.sync({ force: true }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
});
