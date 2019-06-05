"use strict";
// RESTAURANTE-CATEGORIA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.restcategoria_control = {
    create: (req, res) => {
        sequelize_1.RestCategoria.create(req.body).then((respuesta) => {
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
    delete: (req, res) => {
        let { rest_id, cat_id } = req.body;
        sequelize_1.RestCategoria.destroy({ where: { rest_id, cat_id } }).then((respuesta) => {
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
    }
};
