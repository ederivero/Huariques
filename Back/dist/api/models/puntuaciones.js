"use strict";
// PUNTUACIONES MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.puntuaciones_model = (sequelize, type) => {
    var puntuaciones_model = sequelize.define('t_puntuacion', {
        punt_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        punt_cali: {
            type: type.INTEGER,
            allowNull: false,
        },
        punt_cant: {
            type: type.INTEGER,
            allowNull: false,
        },
        punt_limp: {
            type: type.INTEGER,
            allowNull: false,
        },
        punt_total: {
            type: type.INTEGER,
            allowNull: false,
        },
        punt_coment: {
            type: type.STRING(45),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 't_puntuacion'
    });
    return puntuaciones_model;
};
