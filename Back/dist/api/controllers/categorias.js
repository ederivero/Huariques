"use strict";
// CATEGORIA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.producto_control = {
    findByLike: (req, res) => {
        let { palabra } = req.params;
        sequelize_1.Categoria.findAll({
            where: {
                cat_nom: {
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
        sequelize_1.Categoria.findAll().then((categoria) => {
            if (categoria) {
                let response = {
                    message: 'Ok',
                    content: categoria
                };
                res.status(200).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer categorias'
                };
                res.status(201).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        sequelize_1.Categoria.create(req.body).then((categoria) => {
            if (categoria) {
                let response = {
                    message: 'Ok',
                    content: categoria
                };
                res.status(201).json(response);
            }
            else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear categoria'
                };
                res.status(400).json(response);
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
};
