// USUARIO ROUTER
import { usuario_control } from '../controllers/usuario'
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

export var usuario_router = Router();
usuario_router.post('/usuario/crear', multer.single('imagen'), usuario_control.create);
usuario_router.post('/usuario/login', usuario_control.login);
usuario_router.get('/usuario/traertodos', usuario_control.getAll);
usuario_router.get('/usuario/traerporcorreo/:correo', usuario_control.getByEmail);
usuario_router.get('/usuario/traerporid/:id', usuario_control.getById);
usuario_router.put('/usuario/actualizar/:id', multer.single('imagen'), usuario_control.upDateById);

