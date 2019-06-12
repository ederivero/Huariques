// OFERTA MODEL

import { Sequelize } from 'sequelize';

export var oferta_model = (sequelize: Sequelize, type: any) => {
    var oferta_model = sequelize.define('t_oferta',
        {
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
            },ofer_img:{
                type: type.STRING(1000),
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 't_oferta'
        });

    return oferta_model;

}