// REGISTRO CLIENTE CONTROLLERS

import { Request, Response } from 'express';
import { RegCliente } from './../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;

export var regcliente_control = {
    create: (req: Request, res: Response) => {
        RegCliente.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear registro de cliente'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    findByRestaurante: (req: Request, res: Response) => {
        let { id_rest } = req.params;
        RegCliente.findAll({
            where: { rest_id: id_rest }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de cliente'
                })
            }
        })
    },
    findByRestauranteAndUsuario: (req: Request, res: Response) => {
        let { id_usu, id_rest } = req.params;
        RegCliente.findAll({
            where: { usu_id: id_usu, rest_id: id_rest }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de cliente con usuario'
                })
            }
        })
    },
    findByUsuario: (req: Request, res: Response) => {
        let { id_usu } = req.params;
        RegCliente.findAll({
            where: { usu_id: id_usu }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de usuario'
                })
            }
        })
    }
}