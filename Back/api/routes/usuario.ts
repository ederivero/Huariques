// USUARIO ROUTER
import {usuario_control} from '../controllers/usuario'
import {Router} from 'express';
export var usuario_router = Router();
usuario_router.get('/usuario/traertodos',usuario_control.getAll);
usuario_router.get('/usuario/traerporcorreo/:correo',usuario_control.getByEmail);
usuario_router.post('/usuario/crear',usuario_control.create);
usuario_router.put('/usuario/actualizar/:id',usuario_control.upDateById);
