"use strict";
// PRODUCTO CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.producto_control = {
    findByLike: (req, res) => {
        let { palabra } = req.params;
        sequelize_1.Producto.findAll({
            where: {
                prod_nom: {
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
        sequelize_1.Producto.findAll().then((producto) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer productos'
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getById: (req, res) => {
        let { prod_id } = req.params;
        sequelize_1.Producto.findAll({ where: { prod_id } }).then((producto) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Produto no encontrado'
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        sequelize_1.Producto.create(req.body).then((producto) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(201).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear producto'
                };
                res.status(400).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    upDateById: (req, res) => {
        let { prod_id } = req.params;
        sequelize_1.Producto.update(req.body, {
            where: { prod_id: prod_id }
        }).then((producto) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error al actualizar producto',
                    content: producto
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};
