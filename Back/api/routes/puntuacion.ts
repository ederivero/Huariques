// PUNTUACION ROUTER
import {puntuacion_control} from '../controllers/puntuacion'
import {Router} from 'express';
export var puntuacion_router = Router();
puntuacion_router.post('/puntuacion/crear',puntuacion_control.create);
puntuacion_router.get('/puntuacion/mostrar/:id_cliente',puntuacion_control.mostrar);
