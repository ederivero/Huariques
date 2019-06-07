"use strict";
// RESTAURANTE_CATEGORIA MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.restCategoria_model = (sequelize, type) => {
    var restCategoria_model = sequelize.define('t_restCategoria', {
        resCat_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 't_restCategoria'
    });
    return restCategoria_model;
};
