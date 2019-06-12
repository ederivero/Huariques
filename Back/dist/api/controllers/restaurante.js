"use strict";
// RESTAURANTE CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
var path_module = require('path');
var fs = require('fs');
const Op = Sequelize.Op;
const SubirArchivoFirebase_1 = require("../utils/SubirArchivoFirebase");
exports.restaurante_control = {
    findByLike: (req, res) => {
        let { palabra } = req.params;
        sequelize_1.Restaurante.findAll({
            where: {
                rest_rSocial: {
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
                    content: 'Error al encontrar restaurante'
                });
            }
        });
    },
    getAll: (req, res) => {
        sequelize_1.Restaurante.findAll({
            include: [{
                    model: sequelize_1.Producto
                }]
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurantes'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        let imagen = req.file;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'restaurantes').then((link) => {
                let { rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id } = req.body;
                let parametros = {
                    rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id, rest_img: link[0],
                };
                sequelize_1.Restaurante.create(parametros).then((restaurante) => {
                    if (parametros) {
                        res.status(201).json({
                            message: 'Ok',
                            content: restaurante
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al crear restaurante'
                        });
                    }
                }).catch((error) => {
                    res.send(error);
                    console.log("Error => " + error);
                });
            });
        }
        else {
            res.status(400).json({ error: 'No hay archivos' });
        }
    },
    deleteById: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.Restaurante.update({
            rest_estado: 0
        }, {
            where: {
                rest_id
            }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al eliminar restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    upDateById: (req, res) => {
        let imagen = req.file;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'restaurantes').then((link) => {
                let { rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id } = req.body;
                let parametros = {
                    rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id, rest_img: link[0],
                };
                let { rest_id } = req.params;
                sequelize_1.Restaurante.update(parametros, {
                    where: { rest_id }
                }).then((restaurante) => {
                    if (restaurante) {
                        res.status(201).json({
                            message: 'Ok',
                            content: restaurante
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al actualizar restaurante'
                        });
                    }
                }).catch((error) => {
                    console.log("Error => " + error);
                });
            });
        }
        else {
            let { rest_id } = req.params;
            sequelize_1.Restaurante.update(req.body, {
                where: { rest_id }
            }).then((restaurante) => {
                if (restaurante) {
                    res.status(201).json({
                        message: 'Ok',
                        content: restaurante
                    });
                }
                else {
                    res.status(400).json({
                        message: 'Error',
                        content: 'Error al actualizar restaurante'
                    });
                }
            }).catch((error) => {
                console.log("Error => " + error);
            });
        }
    },
    getByUsuId: (req, res) => {
        let { usu_id } = req.params;
        sequelize_1.Restaurante.findAll({
            where: { usu_id }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getImagenByName: (req, res) => {
        res.send('Este paquete ha sido deprecado, evite su uso');
        // let ruta = `images/${req.params.name}`;
        // let rutaDefault = `images/default.png`;
        // if (fs.existsSync(ruta)) {
        //     return res.sendFile(path_module.resolve(ruta));
        // } else {
        //     return res.sendFile(path_module.resolve(rutaDefault));
        // }
    },
    getById: (req, res) => {
        let { id } = req.params;
        sequelize_1.Restaurante.findAll({
            where: {
                rest_id: id
            }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};
