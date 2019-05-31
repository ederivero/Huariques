import {usuario_model} from '../models/usuario';
import {restaurante_model} from '../models/restaurante';
import {busquedas_model} from '../models/busquedas';
import {regCliente_model} from '../models/regCliente';
import {puntuaciones_model} from '../models/puntuaciones';
import {restCategoria_model} from '../models/restCategoria';
import {categoria_model} from '../models/categoria';
import {producto_model} from '../models/producto';
import {oferta_model} from '../models/oferta';

const Sequelize = require('sequelize');

export const sequelize = new Sequelize('UipUxZkjnm','UipUxZkjnm','70MzF37DVG',{
    host:'remotemysql.com',
    dialect:'mysql',
    timezone:'-05:00',
    logging: console.log
});
export const Usuario:any  = usuario_model(sequelize,Sequelize);
export const Restaurante:any = restaurante_model(sequelize,Sequelize);
export const Busquedas:any = busquedas_model(sequelize,Sequelize);
export const RegCliente:any = regCliente_model(sequelize,Sequelize);
export const Puntuaciones:any = puntuaciones_model(sequelize,Sequelize);
export const RestCategoria:any = restCategoria_model(sequelize,Sequelize);
export const Categoria:any = categoria_model(sequelize,Sequelize);
export const Producto:any = producto_model(sequelize,Sequelize);
export const Oferta:any = oferta_model(sequelize,Sequelize);

Usuario.hasMany(Restaurante,{foreignKey:'usu_id'});
Usuario.hasMany(Busquedas,{foreignKey:'usu_id'});
Usuario.hasMany(RegCliente,{foreignKey:'usu_id'});

Restaurante.hasMany(RegCliente,{foreignKey:'rest_id'});
Restaurante.hasMany(RestCategoria,{foreignKey:'rest_id'});
Restaurante.hasMany(Producto,{foreignKey:'rest_id'});

RegCliente.hasMany(Puntuaciones,{foreignKey:'regCliente_id'});

Categoria.hasMany(RestCategoria,{foreignKey:'cat_id'});

Producto.hasMany(Oferta,{foreignKey:'prod_id'});











