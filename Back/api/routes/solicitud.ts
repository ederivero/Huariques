// SOLICITUD ROUTER
import { solicitud_control } from '../controllers/solicitud'
import { Router } from 'express';
export var solicitud_router = Router();
solicitud_router.post('/solicitud/crear', solicitud_control.create);
solicitud_router.delete('/solicitud/borrar', solicitud_control.delete);