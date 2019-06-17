"use strict";
// CATEGORIA CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("../config/sequelize");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
exports.categoria_control = {
    findById: (req, res) => {
        let { id } = req.params;
        sequelize_1.Categoria.findAll({
            where: {
                cat_id: id
            }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(204).json({
                    message: 'No se encontro'
                });
            }
        });
    },
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
                res.status(204).json({
                    message: 'No se encontro'
                });
            }
        });
    },
    getAll: (req, res) => {
        sequelize_1.Categoria.findAll().then((categoria) => {
            if (categoria) {
                res.status(200).json({
                    message: 'Ok',
                    content: categoria
                });
            }
            else {
                res.status(204).json({
                    message: 'Error',
                    content: 'Error al traer categorias'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        sequelize_1.Categoria.create(req.body).then((categoria) => {
            if (categoria) {
                res.status(201).json({
                    message: 'Ok',
                    content: categoria
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear categoria'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
};
