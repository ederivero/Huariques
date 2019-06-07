// PUNTUACION CONTROLLERS

import { Request, Response } from 'express';
import { Puntuaciones } from '../config/sequelize';

export var puntuacion_control = {
    create: (req: Request, res: Response) => {
        Puntuaciones.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                let response = {
                    message: 'Ok',
                    content: respuesta
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear categoria con restaurante'
                };
                res.status(400).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    mostrar: (req: Request, res: Response) => {
        let { id_cliente } = req.params;
        Puntuaciones.findAll({
            where:
            {
                regCliente_id: id_cliente
            }
        }).then((respuesta: any) => {
            if (respuesta) {
                let response = {
                    message: 'Ok',
                    content: respuesta
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'usuuto no encontrado'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}