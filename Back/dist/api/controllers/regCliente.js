"use strict";
// REGISTRO CLIENTE CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.regcliente_control = {
    create: (req, res) => {
        sequelize_1.RegCliente.create(req.body).then((respuesta) => {
            if (respuesta) {
                let response = {
                    message: 'Ok',
                    content: respuesta
                };
                res.status(201).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear categoria con restaurante'
                };
                res.status(400).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    findByRestaurante: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.RegCliente.findAll({
            where: { rest_id }
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
    findByRestauranteAndUsuario: (req, res) => {
        let { usu_id, rest_id } = req.params;
        sequelize_1.RegCliente.findAll({
            where: { usu_id, rest_id }
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
    findByUsuario: (req, res) => {
        let { usu_id } = req.params;
        sequelize_1.RegCliente.findAll({
            where: { usu_id }
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
    }
};
