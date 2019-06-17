"use strict";
// USUARIO MODEL
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
exports.usuario_model = (sequelize, type) => {
    var usuario_model = sequelize.define('t_usuario', {
        usu_id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        usu_email: {
            type: type.STRING(50),
            allowNull: false,
            unique: true
        },
        usu_nom: {
            type: type.STRING(45),
            allowNull: false,
        },
        usu_ape: {
            type: type.STRING(60),
            allowNull: false,
        },
        usu_tel: {
            type: type.STRING(15),
            allowNull: true,
        },
        usu_hash: {
            type: type.TEXT,
            allowNull: false,
        },
        usu_salt: {
            type: type.TEXT,
            allowNull: false,
        },
        usu_tipo: {
            type: type.STRING(1),
            allowNull: false,
        },
        usu_img: {
            type: type.STRING(1000),
            allowNull: true
        }
    }, {
        timestamps: false,
        tableName: 't_usuario'
    });
    usuario_model.prototype.setSaltAndHash = function (password) {
        this.usu_salt = crypto.randomBytes(16).toString('hex');
        this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    };
    usuario_model.prototype.validPassword = function (password) {
        let hash_temporal = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
        if (hash_temporal === this.usu_hash) {
            return true;
        }
        else {
            return false;
        }
    };
    usuario_model.prototype.generateJWT = function () {
        let payload = {
            usu_id: this.usu_email,
            usu_nom: `${this.usu_nom} ${this.usu_ape}`,
            usu_tipo: this.usu_tipo
        };
        var token = jwt.sign(payload, 'huariques', { expiresIn: '30min' }, { algorithm: 'RS256' });
        return token;
    };
    return usuario_model;
};
