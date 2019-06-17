// RESTAURANTE ROUTER
import { restaurante_control } from '../controllers/restaurante'
import { Router } from 'express';

//libreria que ayuda a los req.file npm i multer
const Multer = require('multer');
//se le da atributos que guarden en la memory storage y que tenga un limite de archivo en este caso de 5mb (el tamaño es en bytes)
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
    }
});

export var restaurante_router = Router();
restaurante_router.post('/restaurante/crear', multer.single('imagen'), restaurante_control.create);
restaurante_router.put('/restaurante/actualizar/:prod_id', multer.single('imagen'), restaurante_control.upDateById);
restaurante_router.get('/restaurante/traertodos', restaurante_control.getAll);
restaurante_router.get('/restaurante/borrar/:rest_id', restaurante_control.deleteById);
restaurante_router.get('/restaurante/encontrar/:palabra', restaurante_control.findByLike);
restaurante_router.get('/restaurante/getImagenByName/:name',restaurante_control.getImagenByName);
restaurante_router.get('/restaurante/getByUsuId/:usu_id',restaurante_control.getByUsuId);
restaurante_router.get('/restaurante/getById/:id', restaurante_control.getById);