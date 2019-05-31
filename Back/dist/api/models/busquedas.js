"use strict";
// BUSQUEDAS MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.busquedas_model = (sequelize, type) => {
    var busquedas_model = sequelize.define('t_busquedas', {
        pClaves: {
            type: type.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_busquedas'
    });
    return busquedas_model;
};
