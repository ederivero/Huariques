"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_1 = require("../models/usuario");
const restaurante_1 = require("../models/restaurante");
const busquedas_1 = require("../models/busquedas");
const regCliente_1 = require("../models/regCliente");
const puntuaciones_1 = require("../models/puntuaciones");
const restCategoria_1 = require("../models/restCategoria");
const categoria_1 = require("../models/categoria");
const producto_1 = require("../models/producto");
const oferta_1 = require("../models/oferta");
const Sequelize = require('sequelize');
exports.sequelize = new Sequelize('UipUxZkjnm', 'UipUxZkjnm', '70MzF37DVG', {
    host: 'remotemysql.com',
    dialect: 'mysql',
    timezone: '-05:00',
    logging: console.log
});
exports.Usuario = usuario_1.usuario_model(exports.sequelize, Sequelize);
exports.Restaurante = restaurante_1.restaurante_model(exports.sequelize, Sequelize);
exports.Busquedas = busquedas_1.busquedas_model(exports.sequelize, Sequelize);
exports.RegCliente = regCliente_1.regCliente_model(exports.sequelize, Sequelize);
exports.Puntuaciones = puntuaciones_1.puntuaciones_model(exports.sequelize, Sequelize);
exports.RestCategoria = restCategoria_1.restCategoria_model(exports.sequelize, Sequelize);
exports.Categoria = categoria_1.categoria_model(exports.sequelize, Sequelize);
exports.Producto = producto_1.producto_model(exports.sequelize, Sequelize);
exports.Oferta = oferta_1.oferta_model(exports.sequelize, Sequelize);
exports.Usuario.hasMany(exports.Restaurante, { foreignKey: 'usu_id' });
exports.Usuario.hasMany(exports.Busquedas, { foreignKey: 'usu_id' });
exports.Usuario.hasMany(exports.RegCliente, { foreignKey: 'usu_id' });
exports.Restaurante.hasMany(exports.RegCliente, { foreignKey: 'rest_id' });
exports.Restaurante.hasMany(exports.RestCategoria, { foreignKey: 'rest_id' });
exports.Restaurante.hasMany(exports.Producto, { foreignKey: 'rest_id' });
exports.RegCliente.hasMany(exports.Puntuaciones, { foreignKey: 'regCliente_id' });
exports.Categoria.hasMany(exports.RestCategoria, { foreignKey: 'cat_id' });
exports.Producto.hasMany(exports.Oferta, { foreignKey: 'prod_id' });
