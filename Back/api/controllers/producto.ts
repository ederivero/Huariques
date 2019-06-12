// PRODUCTO CONTROLLERS

import { Request, Response } from 'express';
import { Producto } from './../config/sequelize';
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
import { subirArchivo } from '../utils/SubirArchivoFirebase'

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
    getByIdRest: (req: Request, res: Response) => {
        let { rest_id } = req.params;
        Producto.findAll({
            where: {
                rest_id
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
    create: (req: any, res: Response) => {
        let imagen = req.file;
        if (imagen) {
            subirArchivo(imagen, 'productos').then((link: any) => {
                let { prod_nom, prod_desc, prod_precio, prod_disp, rest_id } = req.body;
                let parametros = {
                    prod_nom, prod_desc, prod_precio, prod_disp, rest_id,
                    prod_img: link[0]
                };
                Producto.create(parametros).then((producto: any) => {
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
            })
        } else {
            res.status(400).json({ error: 'No hay archivos' })
        }
    },
    upDateById: (req: any, res: Response) => {
        let imagen = req.file;
        let { prod_id } = req.params;
        if (imagen) {
            subirArchivo(imagen, 'productos').then((link: any) => {
                let { prod_nom, prod_desc, prod_precio, prod_disp } = req.body;
                let parametros = {
                    prod_nom, prod_desc, prod_precio, prod_disp,
                    prod_img: link[0]
                };
                Producto.update(parametros, {
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
            })
        } else {
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

}