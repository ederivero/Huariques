// REGISTRO CLIENTE CONTROLLERS

import { Request, Response } from 'express';
import { RegCliente } from './../config/sequelize';
import { Restaurante } from './../config/sequelize';


const Sequelize = require('sequelize');

const Op = Sequelize.Op;

export var regcliente_control = {
    create: (req: Request, res: Response) => {
        RegCliente.create(req.body).then((respuesta: any) => {
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
                    message: 'Not found'
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
                    message: 'Not found'
                })
            }
        })
    },
    findByUsuario: (req: Request, res: Response) => {
        let { id_usu } = req.params;
        RegCliente.findAll({
            where: { usu_id: id_usu },
            // include:{
            //     model: Restaurante
            // }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Not found'
                })
            }
        })
    }
}