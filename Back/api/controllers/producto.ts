// PRODUCTO CONTROLLERS

import { Request, Response } from 'express';
import { Producto } from './../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
export var producto_control = {
    findByLike: (req: Request, res: Response) => {
        let { palabra } = req.params;
        Producto.findAll({
            where: {
                prod_nom: {
                    [Op.like]: '%' + palabra + '%'
                }
            }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar producto'
                })
            }
        })
    },
    getAll: (req: Request, res: Response) => {
        Producto.findAll().then((producto: any) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer productos'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    getById: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Producto.findAll({ where: { prod_id } }).then((producto: any) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Produto no encontrado'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        Producto.create(req.body).then((producto: any) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear producto'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    upDateById: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Producto.update(req.body, {
            where: { prod_id }
        }
        ).then((producto: any) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar producto'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }

}