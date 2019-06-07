"use strict";
// BUSQUEDAS MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.busquedas_model = (sequelize, type) => {
    var busquedas_model = sequelize.define('t_busqueda', {
        bus_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        pClaves: {
            type: type.TEXT,
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_busqueda'
    });
    return busquedas_model;
};
