"use strict";
// PUNTUACION CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
exports.puntuacion_control = {
    create: (req, res) => {
        sequelize_1.Puntuaciones.create(req.body).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear puntuacion con restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    mostrar: (req, res) => {
        let { id_cliente } = req.params;
        sequelize_1.Puntuaciones.findAll({
            where: {
                regCliente_id: id_cliente
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
                    content: 'Puntuacion de usuario no encontrado'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};
