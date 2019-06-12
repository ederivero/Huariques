// OFERTA ROUTER
import { oferta_control } from '../controllers/oferta'
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

export var oferta_router = Router();
oferta_router.post('/oferta/crear', multer.single('imagen'), oferta_control.create);
oferta_router.put('/oferta/actualizar/:prod_id', multer.single('imagen'), oferta_control.update);