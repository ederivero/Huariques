// REGISTRO CLIENTE ROUTER
import {regcliente_control} from '../controllers/regCliente'
import {Router} from 'express';
export var regcliente_router = Router();
regcliente_router.post('/regcli/crear',regcliente_control.create);
regcliente_router.get('/regcli/encontrarporrest/:id_rest',regcliente_control.findByRestaurante);
regcliente_router.get('/regcli/encontrarporusurest/:id_usu/:id_rest',regcliente_control.findByRestauranteAndUsuario);
regcliente_router.get('/regcli/encontrarporusu/:id_usu',regcliente_control.findByUsuario);