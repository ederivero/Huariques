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
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear registro de cliente'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    findByRestaurante: (req, res) => {
        let { id_rest } = req.params;
        sequelize_1.RegCliente.findAll({
            where: { rest_id: id_rest }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de cliente'
                });
            }
        });
    },
    findByRestauranteAndUsuario: (req, res) => {
        let { id_usu, id_rest } = req.params;
        sequelize_1.RegCliente.findAll({
            include: [
                model
            ],
            where: { usu_id: id_usu, rest_id: id_rest }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de cliente con usuario'
                });
            }
        });
    },
    findByUsuario: (req, res) => {
        let { id_usu } = req.params;
        sequelize_1.RegCliente.findAll({
            where: { usu_id: id_usu }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encotrar registro de usuario'
                });
            }
        });
    }
};
