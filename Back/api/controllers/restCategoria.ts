// RESTAURANTE-CATEGORIA CONTROLLERS

import { Request, Response } from 'express';
import { RestCategoria } from './../config/sequelize'

export var restcategoria_control = {
    create: (req: Request, res: Response) => {
        RestCategoria.create(req.body).then((respuesta: any) => {
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
    delete: (req: Request, res: Response) => {
        let { rest_id, cat_id } = req.body
        RestCategoria.destroy({ where: { rest_id, cat_id } }).then((respuesta: any) => {
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