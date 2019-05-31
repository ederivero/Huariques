// PUNTUACIONES MODEL

import { Sequelize } from 'sequelize';

export var puntuaciones_model = (sequelize: Sequelize, type: any) => {
    var puntuaciones_model = sequelize.define('t_puntuaciones',
        {
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
        },
        {
            timestamps: false,
            tableName: 't_puntuaciones'
        });

    return puntuaciones_model;

}