import http from 'http';
import socketIO from 'socket.io';

import { sequelize } from './api/config/sequelize';
import { NextFunction, Request, Response } from 'express';


var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3000;

var app = express();
app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto 3000");
    
    sequelize.sync({ force: true }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error:any) => {
        console.log(error);
        console.log("Error al crear la base de datos");

    })
});