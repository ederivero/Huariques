// BUSQUEDA ROUTER
import {busqueda_control} from '../controllers/busqueda'
import {Router} from 'express';
export var busqueda_router = Router();
busqueda_router.post('/busqueda/crear',busqueda_control.create);
busqueda_router.get('/busqueda/encontrar/:id_usu',busqueda_control.findById);