// RESTAURANTE ROUTER
import {restaurante_control} from '../controllers/restaurante'
import {Router} from 'express';

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir:'./images'});

export var restaurante_router = Router();
restaurante_router.post('/restaurante/crear',multipartMiddleware,restaurante_control.create);
restaurante_router.put('/restaurante/:prod_id',restaurante_control.upDateById);
restaurante_router.get('/restaurante',restaurante_control.getAll);
restaurante_router.get('/restaurante/:rest_id',restaurante_control.deleteById);
restaurante_router.get('/restaurante/:palabra',restaurante_control.findByLike);