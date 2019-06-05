// CATEGORIA CONTROLLERS

import { Request, Response } from 'express';
import { Categoria } from './../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
export var producto_control = {
    findByLike: (req: Request, res: Response) => {
        let { palabra } = req.params;
        Categoria.findAll({
            where: {
                cat_nom: {
                    [Op.like]: '%' + palabra + '%'
                }
            }
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
    getAll: (req: Request, res: Response) => {
        Categoria.findAll().then((categoria: any) => {
            if (categoria) {
                let response = {
                    message: 'Ok',
                    content: categoria
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer categorias'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        Categoria.create(req.body).then((categoria: any) => {
            if (categoria) {
                let response = {
                    message: 'Ok',
                    content: categoria
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear categoria'
                };
                res.status(400).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
}