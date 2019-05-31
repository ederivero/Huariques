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
            type: type.STRING(60),
            allowNull: false,
            unique: true
        },
        usu_nom: {
            type: type.STRING(45),
            allowNull: false,
        },
        usu_ape_pate: {
            type: type.STRING(45),
            allowNull: false,
        },
        usu_ape_mate: {
            type: type.STRING(45),
            allowNull: false,
        },
        usu_tel: {
            type: type.STRING(50),
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
        }
    }, {
        timestamps: false,
        tableName: 't_usuario'
    });
    // usuario_model.prototype.setSaltAndHash = function (password: any) {
    //     this.usu_salt = crypto.randomBytes(16).toString('hex');
    //     this.usu_hash = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    // };
    // usuario_model.prototype.validPassword = function(password:any){
    //     let hash_temporal = crypto.pbkdf2Sync(password, this.usu_salt, 1000, 64, 'sha512').toString('hex');
    //     if(hash_temporal === this.usu_hash){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // };
    // usuario_model.prototype.generateJWT = function(){
    //     let payload = {
    //         usu_id: this.usu_email,
    //         usu_nom: `${this.usu_nom} ${this.usu_ape}`
    //     };
    //     var token = jwt.sign(payload,'DK_dev',{ expiresIn: '1h'},{algorithm: 'RS256'});
    //     return token;
    // }
    return usuario_model;
};
