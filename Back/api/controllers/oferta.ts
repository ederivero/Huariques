// OFERTA CONTROLLERS

import { Request, Response } from 'express';
import { Oferta } from './../config/sequelize';

export var oferta_control = {
    create: (req: Request, res: Response) => {
        Oferta.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear oferta'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    update: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Oferta.update(req.body, {
            where: { prod_id }
        }
        ).then((restaurante: any) => {
            if (restaurante) {
                res.status(200).json({
                    message: 'Ok',
                    content: restaurante
                });
            } else {
                res.status(400).json( {
                    message: 'Error',
                    content: 'Error al actualizar restaurante'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}