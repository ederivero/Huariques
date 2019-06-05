import { producto_router } from './api/routes/producto'
import { sequelize } from './api/config/sequelize';
import { NextFunction, Request, Response } from 'express';
import { restaurante_router } from './api/routes/restaurante';


var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3001;

var app = express();

// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURANDO EL CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST,PUT');
    res.header('Allow', 'GET, POST,PUT');
    next();
});


// usando las rutas importadas
app.use('/api', producto_router);
app.use('/api', restaurante_router);

app.listen(PUERTO, function () {
    console.log("Servidor corriendo correctamente en el puerto "+PUERTO);

    sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error: any) => {
        console.log(error);
        console.log("Error al crear la base de datos");

    })
}); 