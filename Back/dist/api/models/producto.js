"use strict";
// PRODUCTO MODEL
Object.defineProperty(exports, "__esModule", { value: true });
exports.producto_model = (sequelize, type) => {
    var producto_model = sequelize.define('t_producto', {
        prod_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        prod_nom: {
            type: type.STRING(20),
            allowNull: false,
        },
        prod_desc: {
            type: type.STRING(45),
            allowNull: false,
        },
        prod_precio: {
            type: type.DECIMAL(5, 2),
            allowNull: false,
        },
        prod_disp: {
            type: type.STRING(1),
            allowNull: false,
        },
        prod_img: {
            type: type.STRING(200),
            allowNull: false,
        },
    }, {
        timestamps: false,
        tableName: 't_producto'
    });
    return producto_model;
};
