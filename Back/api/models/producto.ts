// PRODUCTO MODEL

import { Sequelize } from 'sequelize';

export var producto_model = (sequelize: Sequelize, type: any) => {
    var producto_model = sequelize.define('t_producto',
        {
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
                type: type.DECIMAL(5,2),
                allowNull: false,
            },
            prod_disp: {
                type: type.STRING(1),
                allowNull: false,
            },
            prod_img: {
                type: type.STRING(1000),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 't_producto'
        });

    return producto_model;

}