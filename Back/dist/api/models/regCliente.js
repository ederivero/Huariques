"use strict";
// REGISTRO_CLIENTE MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.regCliente_model = (sequelize, type) => {
    var regCliente_model = sequelize.define('t_regCliente', {
        regCliente_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        regCliente_fecha: {
            type: type.DATE(),
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_regCliente'
    });
    return regCliente_model;
};
