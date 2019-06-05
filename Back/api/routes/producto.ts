// PRODUCTOR ROUTER
import {producto_control} from '../controllers/producto'
import {Router} from 'express';
export var producto_router = Router();
producto_router.post('producto/crear',producto_control.create);
producto_router.put('producto/:prod_id',producto_control.upDateById);
producto_router.get('producto',producto_control.getAll);
producto_router.get('producto/:prod_id',producto_control.getById);
producto_router.get('producto/:palabra',producto_control.findByLike);