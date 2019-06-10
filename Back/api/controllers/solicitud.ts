// REGISTRO CLIENTE CONTROLLERS

import { Request, Response } from 'express';
import { Solicitud } from './../config/sequelize';
export var solicitud_control = {
    create: (req: Request, res: Response) => {
        Solicitud.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear la solicitud'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    delete: (req: Request, res: Response) => {
        let { sol_id } = req.params
        Solicitud.destroy({ where: { sol_id } }).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al eliminar la solicitud'
                });
            }

        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}