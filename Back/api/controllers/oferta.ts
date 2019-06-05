// OFERTA CONTROLLERS

import { Request, Response } from 'express';
import { Oferta } from './../config/sequelize';

export var ofertas_control = {
    create: (req: Request, res: Response) => {
        Oferta.create(req.body).then((respuesta: any) => {
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
    update: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Oferta.update(req.body, {
            where: { prod_id }
        }
        ).then((restaurante: any) => {
            if (restaurante) {
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al actualizar restaurante',
                    content: restaurante
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}