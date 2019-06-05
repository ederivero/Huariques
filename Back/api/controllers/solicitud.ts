// REGISTRO CLIENTE CONTROLLERS

import { Request, Response } from 'express';
import { Solicitud } from './../config/sequelize';
export var solicitud_control = {
    create: (req: Request, res: Response) => {
        Solicitud.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                let response = {
                    message: 'Ok',
                    content: respuesta
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear la solicitud'
                };
                res.status(400).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    delete: (req: Request, res: Response) => {
        let { sol_id } = req.params
        Solicitud.destroy({ where: { sol_id } }).then((respuesta: any) => {
            if (respuesta) {
                let response = {
                    message: 'Ok',
                    content: respuesta
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al eliminar'
                };
                res.status(400).json(response);
            }

        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}