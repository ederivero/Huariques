// PRODUCTOR ROUTER
import { producto_control } from '../controllers/producto'
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

export var producto_router = Router();
producto_router.post('/producto/crear', multer.single('imagen'), producto_control.create);
producto_router.put('/producto/actualizar/:prod_id', producto_control.upDateById);
producto_router.get('/producto/traertodos', producto_control.getAll);
producto_router.get('/producto/porId/:prod_id', producto_control.getById);
producto_router.get('/producto/porPalabra/:palabra', producto_control.findByLike);
producto_router.get('/producto/porIdRest/:rest_id', producto_control.getByIdRest);
