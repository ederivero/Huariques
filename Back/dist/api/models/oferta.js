"use strict";
// OFERTA MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.oferta_model = (sequelize, type) => {
    var oferta_model = sequelize.define('t_oferta', {
        ofer_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ofer_tipo: {
            type: type.STRING(150),
            allowNull: false,
        },
        ofer_disp: {
            type: type.STRING(1),
            allowNull: false,
        }, ofer_img: {
            type: type.STRING(1000),
            allowNull: false,
        }
    }, {
        timestamps: false,
        tableName: 't_oferta'
    });
    return oferta_model;
};
