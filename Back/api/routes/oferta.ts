// OFERTA ROUTER
import {oferta_control} from '../controllers/oferta'
import {Router} from 'express';
export var oferta_router = Router();
oferta_router.post('/oferta/crear',oferta_control.create);
oferta_router.put('/oferta/actualizar/:prod_id',oferta_control.update);