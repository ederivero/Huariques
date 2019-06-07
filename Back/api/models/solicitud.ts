// USUARIO MODEL

import { Sequelize } from 'sequelize';

export var solicitud_model = (sequelize: Sequelize, type: any) => {
    var solicitud_model = sequelize.define('t_solicitud',
        {
            sol_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            sol_rSocial: {
                type: type.STRING(45),
                allowNull: false,
            },
            sol_direccion: {
                type: type.STRING(60),
                allowNull: false,
            },
            sol_lat: {
                type: type.DECIMAL(10,7),
                allowNull: false,
            },
            sol_lng: {
                type: type.DECIMAL(10,7),
                allowNull: false,
            },
            sol_email: {
                type: type.STRING(100),
                allowNull: false,
            },
            sol_tipo: {
                type: type.STRING(1),
                allowNull: false,
            },
            sol_desc:{
                type:type.STRING(100),
                allowNull:true
            }
        },
        {
            timestamps: false,
            tableName: 't_solicitud'
        });


    return solicitud_model;
}