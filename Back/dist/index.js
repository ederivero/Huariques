"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producto_1 = require("./api/routes/producto");
const sequelize_1 = require("./api/config/sequelize");
const restaurante_1 = require("./api/routes/restaurante");
var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3001;
var app = express();
// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CONFIGURANDO EL CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST,PUT');
    res.header('Allow', 'GET, POST,PUT');
    next();
});
// usando las rutas importadas
app.use('/api', producto_1.producto_router);
app.use('/api', restaurante_1.restaurante_router);
app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto " + PUERTO);
    sequelize_1.sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
});
