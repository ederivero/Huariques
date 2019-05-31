// REGISTRO_CLIENTE MODEL

import { Sequelize } from 'sequelize';

export var regCliente_model = (sequelize: Sequelize, type: any) => {
    var regCliente_model = sequelize.define('t_regCliente',
        {
            regCliente_id: {
                type: type.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            regCliente_fecha: {
                type: type.DATE(),
                allowNull: false,
            }
        },
        {
            timestamps: false,
            tableName: 't_regCliente'
        });

    return regCliente_model;

}