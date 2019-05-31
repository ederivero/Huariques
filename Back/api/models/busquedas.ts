// BUSQUEDAS MODEL

import { Sequelize } from 'sequelize';

export var busquedas_model = (sequelize: Sequelize, type: any) => {
    var busquedas_model = sequelize.define('t_busquedas',
        {
            pClaves: {
                type: type.TEXT,
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 't_busquedas'
        });

    return busquedas_model;

}