// PUNTUACION CONTROLLERS

import { Request, Response } from 'express';
import { Puntuaciones } from '../config/sequelize';

export var puntuacion_control = {
    create: (req: Request, res: Response) => {
        Puntuaciones.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear puntuacion con restaurante'
                });
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
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Puntuacion de usuario no encontrado'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}