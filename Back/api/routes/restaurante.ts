// RESTAURANTE ROUTER
import {restaurante_control} from '../controllers/restaurante'
import {Router} from 'express';

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./images'});

export var restaurante_router = Router();
// restaurante_router.post('/restaurante/crear',multipartMiddleware,restaurante_control.create);
restaurante_router.post('/restaurante/crear',restaurante_control.create);
restaurante_router.put('/restaurante/actualizar/:prod_id',restaurante_control.upDateById);
restaurante_router.get('/restaurante/traertodos',restaurante_control.getAll);
restaurante_router.get('/restaurante/borrar/:rest_id',restaurante_control.deleteById);
restaurante_router.get('/restaurante/encontrar/:palabra',restaurante_control.findByLike);
restaurante_router.get('/restaurante/getImagenByName/:name',restaurante_control.getImagenByName);
//AGREGAR
restaurante_router.get('/restaurante/getById/:id',restaurante_control.getById);