// RSTAURANTE CATEGORIA ROUTER
import {restcategoria_control} from '../controllers/restcategoria'
import {Router} from 'express';
export var restcategoria_router = Router();
restcategoria_router.post('/restcategoria/crear',restcategoria_control.create);
restcategoria_router.delete('/restcategoria/eliminar',restcategoria_control.delete);
