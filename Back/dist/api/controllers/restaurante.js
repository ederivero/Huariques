"use strict";
// RESTAURANTE CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
var path_module = require('path');
var fs = require('fs');
const Op = Sequelize.Op;
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
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Not found'
                });
            }
        });
    },
    getAll: (req, res) => {
        sequelize_1.Restaurante.findAll().then((restaurante) => {
            if (restaurante) {
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer restaurantes'
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        if (req.files) {
            let ruta = req.files.rest_img.path;
            // LOCALMENTE SE USA '\\'
            // let nombreYExtension = ruta.split('\\')[1];
            //PARA HEROKU SE USA '/'
            let nombreYExtension = ruta.split('/')[1];
            let { rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id } = req.body;
            sequelize_1.Restaurante.create({
                rest_rSocial,
                rest_direccion,
                rest_telefono,
                rest_lat,
                rest_lng,
                rest_info,
                rest_img: nombreYExtension,
                rest_refUbicacion,
                rest_dAtencion,
                rest_hApertura,
                rest_hCierre,
                rest_avisos,
                rest_estado,
                rest_verificacion,
                usu_id
            }).then((restaurante) => {
                if (restaurante) {
                    let response = {
                        message: 'Ok',
                        content: restaurante
                    };
                    res.status(201).json(response);
                }
                else {
                    let response = {
                        message: 'Error',
                        content: 'Error al crear restaurante'
                    };
                    res.status(400).json(response);
                }
            }).catch((error) => {
                res.send(error);
                console.log("Error => " + error);
            });
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
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error al eliminar restaurante',
                    content: restaurante
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    upDateById: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.Restaurante.update(req.body, {
            where: { rest_id }
        }).then((restaurante) => {
            if (restaurante) {
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error al actualizar restaurante',
                    content: restaurante
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getImagenByName: (req, res) => {
        let ruta = `images/${req.params.name}`;
        let rutaDefault = `images/default.png`;
        if (fs.existsSync(ruta)) {
            return res.sendFile(path_module.resolve(ruta));
        }
        else {
            return res.sendFile(path_module.resolve(rutaDefault));
        }
    }
};
