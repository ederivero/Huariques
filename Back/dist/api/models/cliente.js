"use strict";
// CLIENTE MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.cliente_model = (sequelize, type) => {
    var cliente_model = sequelize.define('t_cliente', {
        cliente_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_cliente'
    });
    return cliente_model;
};
