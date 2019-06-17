"use strict";
// OFERTA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const SubirArchivoFirebase_1 = require("../utils/SubirArchivoFirebase");
exports.oferta_control = {
    create: (req, res) => {
        let imagen = req.file;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'ofertas').then((link) => {
                let { ofer_tipo, ofer_disp, prod_id } = req.body;
                let parametros = {
                    ofer_tipo, ofer_disp, prod_id,
                    ofer_img: link[0]
                };
                sequelize_1.Oferta.create(parametros).then((respuesta) => {
                    if (respuesta) {
                        res.status(201).json({
                            message: 'Ok',
                            content: respuesta
                        });
                    }
                    else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al crear oferta'
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
    update: (req, res) => {
        let imagen = req.file;
        if (imagen) {
            SubirArchivoFirebase_1.subirArchivo(imagen, 'ofertas').then((link) => {
                let { prod_id } = req.params;
                let { ofer_tipo, ofer_disp } = req.body;
                let parametros = {
                    ofer_tipo, ofer_disp,
                    ofer_img: link[0]
                };
                sequelize_1.Oferta.update(parametros, {
                    where: { prod_id }
                }).then((restaurante) => {
                    if (restaurante) {
                        res.status(200).json({
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
            res.status(400).json({ error: 'No hay archivos' });
        }
    }
};
