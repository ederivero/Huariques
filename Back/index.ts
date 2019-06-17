import { producto_router } from './api/routes/producto'
import { sequelize } from './api/config/sequelize';
import { NextFunction, Request, Response } from 'express';
import { restaurante_router } from './api/routes/restaurante';
import { busqueda_router } from './api/routes/busqueda';
import { categoria_router } from './api/routes/categoria';
import { oferta_router } from './api/routes/oferta';
import { puntuacion_router } from './api/routes/puntuacion';
import { regcliente_router } from './api/routes/regCliente';
import { restcategoria_router } from './api/routes/restCategoria';
import { solicitud_router } from './api/routes/solicitud';
import { usuario_router } from './api/routes/usuario';


var express = require('express');
var bodyParser = require('body-parser');
const PUERTO = process.env.PORT || 3000;

var app = express();

// configuración de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CONFIGURANDO EL CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Allow', 'GET, POST, PUT, DELETE');
    next();
});


// usando las rutas importadas
app.use('/api', busqueda_router);
app.use('/api', categoria_router);
app.use('/api', oferta_router);
app.use('/api', producto_router);
app.use('/api', puntuacion_router);
app.use('/api', regcliente_router);
app.use('/api', restaurante_router);
app.use('/api', restcategoria_router);
app.use('/api', solicitud_router);
app.use('/api', usuario_router);
app.get('/', (req: Request, res: Response) => { res.send('La api funciona!!'); });
app.listen(PUERTO, function () {
    sequelize.sync({ force: false }).then(() => {
        console.log("Base de datos creada con éxito");
    }).catch((error: any) => {
        console.log(error);
        console.log("Error al crear la base de datos");
    });
    console.log("Servidor corriendo correctamente en el puerto " + PUERTO);
});
 