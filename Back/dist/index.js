"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producto_1 = require("./api/routes/producto");
const sequelize_1 = require("./api/config/sequelize");
const restaurante_1 = require("./api/routes/restaurante");
const busqueda_1 = require("./api/routes/busqueda");
const categoria_1 = require("./api/routes/categoria");
const oferta_1 = require("./api/routes/oferta");
const puntuacion_1 = require("./api/routes/puntuacion");
const regCliente_1 = require("./api/routes/regCliente");
const restCategoria_1 = require("./api/routes/restCategoria");
const solicitud_1 = require("./api/routes/solicitud");
const usuario_1 = require("./api/routes/usuario");
var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3000;
var app = express();
// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// CONFIGURANDO EL CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});
// usando las rutas importadas
app.use('/api', busqueda_1.busqueda_router);
app.use('/api', categoria_1.categoria_router);
app.use('/api', oferta_1.oferta_router);
app.use('/api', producto_1.producto_router);
app.use('/api', puntuacion_1.puntuacion_router);
app.use('/api', regCliente_1.regcliente_router);
app.use('/api', restaurante_1.restaurante_router);
app.use('/api', restCategoria_1.restcategoria_router);
app.use('/api', solicitud_1.solicitud_router);
app.use('/api', usuario_1.usuario_router);
app.get('/', (req, res) => { res.send('La api funciona!!'); });
app.listen(PUERTO, function () {
    sequelize_1.sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
    console.log("Servidor corriendo correctamente en el puerto " + PUERTO);
});
