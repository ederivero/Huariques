"use strict";
// REGISTRO CLIENTE CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.solicitud_control = {
    create: (req, res) => {
        sequelize_1.Solicitud.create(req.body).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear la solicitud'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    delete: (req, res) => {
        let { sol_id } = req.params;
        sequelize_1.Solicitud.destroy({ where: { sol_id } }).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al eliminar la solicitud'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};