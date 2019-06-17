// CATEGORIA CONTROLLERS

import { Request, Response } from 'express';
import { Categoria } from '../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
export var categoria_control = {
    findById:(req:Request,res:Response)=>{
        let { id } = req.params;
        Categoria.findAll({
            where: {
                cat_id: id
            }
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
        })
    },
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
                res.status(204).json({
                    message: 'No se encontro'
                })
            }
        })
    },
    getAll: (req: Request, res: Response) => {
        Categoria.findAll().then((categoria: any) => {
            if (categoria) {
                res.status(200).json({
                    message: 'Ok',
                    content: categoria
                });
            } else {
                res.status(204).json({
                    message: 'Error',
                    content: 'Error al traer categorias'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        Categoria.create(req.body).then((categoria: any) => {
            if (categoria) {
                res.status(201).json({
                    message: 'Ok',
                    content: categoria
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear categoria'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
}