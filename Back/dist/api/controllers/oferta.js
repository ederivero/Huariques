"use strict";
// OFERTA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.oferta_control = {
    create: (req, res) => {
        sequelize_1.Oferta.create(req.body).then((respuesta) => {
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
    },
    update: (req, res) => {
        let { prod_id } = req.params;
        sequelize_1.Oferta.update(req.body, {
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
    }
};
