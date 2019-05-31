"use strict";
// VENDEDOR MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendedor_model = (sequelize, type) => {
    var vendedor_model = sequelize.define('t_vendedor', {
        vendedor_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_vendedor'
    });
    return vendedor_model;
};
