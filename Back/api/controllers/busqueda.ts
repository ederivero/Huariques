// BUSQUEDAS CONTROLLERS

import { Request, Response } from 'express';
import { Busquedas } from '../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

export var busqueda_control = {
    create: (req: Request, res: Response) => {
        Busquedas.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear busqueda'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    findById: (req: Request, res: Response) => {
        let { usu_id } = req.params;
        Busquedas.findAll({
            where: {usu_id}
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(204).json({
                    message: 'No se encontro'
                })
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}