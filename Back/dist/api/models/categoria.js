"use strict";
// CATEGORIA MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoria_model = (sequelize, type) => {
    var categoria_model = sequelize.define('t_categoria', {
        cat_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        cat_nom: {
            type: type.STRING(20),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 't_categoria'
    });
    return categoria_model;
};
