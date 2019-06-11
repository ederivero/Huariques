// RESTAURANTE_CATEGORIA MODEL

import { Sequelize } from 'sequelize';

export var restCategoria_model = (sequelize: Sequelize, type: any) => {
    var restCategoria_model = sequelize.define('t_restCategoria',
        {
            resCat_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 't_restCategoria'
        });

    return restCategoria_model;

}