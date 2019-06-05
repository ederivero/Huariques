"use strict";
// OFERTA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.ofertas_control = {
    create: (req, res) => {
        sequelize_1.Oferta.create(req.body).then((respuesta) => {
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
    update: (req, res) => {
        let { prod_id } = req.params;
        sequelize_1.Oferta.update(req.body, {
            where: { prod_id }
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
    }
};
