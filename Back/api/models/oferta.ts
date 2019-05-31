// OFERTA MODEL

import { Sequelize } from 'sequelize';

export var oferta_model = (sequelize: Sequelize, type: any) => {
    var oferta_model = sequelize.define('t_oferta',
        {
            oferta_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            oferta_tipo: {
                type: type.STRING(45),
                allowNull: false,
            },
            oferta_disp: {
                type: type.STRING(1),
                allowNull: false,
            },oferta_img:{
                type: type.STRING(200),
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 't_oferta'
        });

    return oferta_model;

}