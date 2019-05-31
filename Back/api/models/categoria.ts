// CATEGORIA MODEL

import { Sequelize } from 'sequelize';

export var categoria_model = (sequelize: Sequelize, type: any) => {
    var categoria_model = sequelize.define('t_categoria',
        {
            cat_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cat_nom: {
                type: type.STRING(20),
                allowNull: false,
            },
        },
        {
            timestamps: false,
            tableName: 't_categoria'
        });

    return categoria_model;

}