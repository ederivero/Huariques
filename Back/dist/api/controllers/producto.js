"use strict";
// PRODUCTO CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const SubirArchivoFirebase_1 = require("../utils/SubirArchivoFirebase");
exports.producto_control = {
    findByLike: (req, res) => {
        let { palabra } = req.params;
        sequelize_1.Producto.findAll({
            where: {
                prod_nom: {
                    [Op.like]: '%' + palabra + '%'
                }
            }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar producto'
                });
            }
        });
    },
    getByIdRest: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.Producto.findAll({
            where: {
                rest_id
            }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar producto'
                });
            }
        });
    },
    getAll: (req, res) => {
        sequelize_1.Producto.findAll().then((producto) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer productos'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getById: (req, res) => {
        let { prod_id } = req.params;
        sequelize_1.Producto.findAll({ where: { prod_id } }).then((producto) => {
            if (producto) {
                res.status(201).json({
                    message: 'Ok',
                    content: producto
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Produto no encontrado'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        let imagen = req.file;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'productos').then((link) => {
                let { prod_nom, prod_desc, prod_precio, prod_disp, rest_id } = req.body;
                let parametros = {
                    prod_nom, prod_desc, prod_precio, prod_disp, rest_id,
                    prod_img: link[0]
                };
                sequelize_1.Producto.create(parametros).then((producto) => {
                    if (producto) {
                        res.status(201).json({
                            message: 'Ok',
                            content: producto
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al crear producto'
                        });
                    }
                }).catch((error) => {
                    console.log("Error => " + error);
                });
            });
        }
        else {
            res.status(400).json({ error: 'No hay archivos' });
        }
    },
    upDateById: (req, res) => {
        let imagen = req.file;
        let { prod_id } = req.params;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'productos').then((link) => {
                let { prod_nom, prod_desc, prod_precio, prod_disp } = req.body;
                let parametros = {
                    prod_nom, prod_desc, prod_precio, prod_disp,
                    prod_img: link[0]
                };
                sequelize_1.Producto.update(parametros, {
                    where: { prod_id }
                }).then((producto) => {
                    if (producto) {
                        res.status(201).json({
                            message: 'Ok',
                            content: producto
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al actualizar producto'
                        });
                    }
                }).catch((error) => {
                    console.log("Error => " + error);
                });
            });
        }
        else {
            sequelize_1.Producto.update(req.body, {
                where: { prod_id }
            }).then((producto) => {
                if (producto) {
                    res.status(201).json({
                        message: 'Ok',
                        content: producto
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Error',
                        content: 'Error al actualizar producto'
                    });
                }
            }).catch((error) => {
                console.log("Error => " + error);
            });
        }
    }
};
