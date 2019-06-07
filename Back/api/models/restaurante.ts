// RESTAURANTE MODEL

import { Sequelize } from 'sequelize';

export var restaurante_model = (sequelize: Sequelize, type: any) => {
    var restaurante_model = sequelize.define('t_restaurante',
        {
            rest_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            rest_rSocial: {
                type: type.STRING(45),
                allowNull: false,
            },
            rest_direccion: {
                type: type.STRING(60),
                allowNull: false,
            },
            rest_telefono: {
                type: type.STRING(15),
                allowNull: false,
            },
            rest_lat: {
                type: type.DECIMAL(10,7),
                allowNull: false,
            },
            rest_lng: {
                type: type.DECIMAL(10,7),
                allowNull: false,
            },
            rest_info: {
                type: type.STRING(100),
                allowNull: false,
            },
            rest_img: {
                type: type.STRING(50),
                allowNull: false,
            },
            rest_refUbicacion: {
                type: type.STRING(45),
                allowNull: false,
            },
            rest_dAtencion: {
                type: type.STRING(45),
                allowNull: false,
            },
            rest_hApertura: {
                type: type.STRING(8),
                allowNull: false,
            },
            rest_hCierre: {
                type: type.STRING(8),
                allowNull: false,
            },
            rest_avisos: {
                type: type.STRING(45),
                allowNull: true,
            },
            rest_estado:{
                type:type.STRING(1),
                allowNull: false
            },
            rest_verificacion:{
                type:type.STRING(1),
                allowNull:false
            }
            
        },
        {
            timestamps: false,
            tableName: 't_restaurante'
        });

    return restaurante_model;

}