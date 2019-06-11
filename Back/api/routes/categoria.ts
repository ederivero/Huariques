// CATEGORIA ROUTER
import {categoria_control} from '../controllers/categoria'
import {Router} from 'express';
export var categoria_router = Router();
categoria_router.post('/categoria/crear',categoria_control.create);
categoria_router.get('/categoria/traertodos',categoria_control.getAll);
categoria_router.get('/categoria/encontrar/:palabra',categoria_control.findByLike);