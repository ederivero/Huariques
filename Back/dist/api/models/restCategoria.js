"use strict";
// RESTAURANTE_CATEGORIA MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.restCategoria_model = (sequelize, type) => {
    var restCategoria_model = sequelize.define('t_restCategoria', {}, {
        timestamps: false,
        tableName: 't_restCategoria'
    });
    return restCategoria_model;
};
