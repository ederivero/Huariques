// PUNTUACION CONTROLLERS

import { Request, Response } from 'express';
import { Puntuaciones } from './../config/sequelize';

export var puntuaciones_control = {
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
    }
}