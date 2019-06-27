// RSTAURANTE CATEGORIA ROUTER
import {restcategoria_control} from '../controllers/restCategoria'
import {Router} from 'express';
export var restcategoria_router = Router();
restcategoria_router.post('/restcategoria/crear',restcategoria_control.create);
restcategoria_router.get('/restcategoria/rest/:id_rest',restcategoria_control.traerRestById);
restcategoria_router.get('/restcategoria/cat/:id_cat',restcategoria_control.traerCatById);
restcategoria_router.delete('/restcategoria/eliminar',restcategoria_control.delete);