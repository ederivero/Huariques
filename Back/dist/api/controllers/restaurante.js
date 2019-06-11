"use strict";
// RESTAURANTE CONTROLLERS
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
const Sequelize = require('sequelize');
const formidable = require('formidable');
var path_module = require('path');
var fs = require('fs');
const firebase = __importStar(require("firebase"));
const Op = Sequelize.Op;
exports.restaurante_control = {
    findByLike: (req, res) => {
        let { palabra } = req.params;
        sequelize_1.Restaurante.findAll({
            where: {
                rest_rSocial: {
                    [Op.like]: '%' + palabra + '%'
                }
            }
        }).then((respuesta) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encontrar restaurante'
                });
            }
        });
    },
    getAll: (req, res) => {
        sequelize_1.Restaurante.findAll().then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurantes'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        var firebaseConfig = {
            apiKey: "AIzaSyCjnrjecGjB6lN1P7BmJDH_CnhXOoAgVVI",
            authDomain: "api-project-161182547768.firebaseapp.com",
            databaseURL: "https://api-project-161182547768.firebaseio.com",
            projectId: "api-project-161182547768",
            storageBucket: "api-project-161182547768.appspot.com",
            messagingSenderId: "161182547768",
            appId: "1:161182547768:web:482e5f8c565fb2a4"
        };
        new formidable.IncomingForm().parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error', err);
                throw err;
            }
            // console.log('Fields', fields)
            let metadata = {
                contentType: files.rest_img.type
            };
            firebase.initializeApp(firebaseConfig);
            // console.log(files.rest_img.name);
            // console.log(files.rest_img.type);
            // console.log(files.rest_img.path);
            console.log(files);
            res.status(200).json(files.rest_img);
            let referenciasStorage = firebase.storage().ref();
            referenciasStorage.child(`restaurantes/${files.rest_img.name}`).put(files.rest_img, metadata).then(respuesta => {
                console.log(respuesta.ref.getDownloadURL());
            });
            // console.log(files.rest_img.name);
            // console.log(files.rest_img.type);
            // console.log(files.rest_img.path);
            // files.map(file => {
            //   console.log(file)
            // })
        });
        /*
        if (req.files) {
            let ruta = req.files.rest_img.path;
            // LOCALMENTE SE USA '\\'
            // let nombreYExtension = ruta.split('\\')[1];
            
            //PARA HEROKU SE USA '/'
            let nombreYExtension = ruta.split('/')[1];
            
            let { rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id } = req.body;
            Restaurante.create({
                rest_rSocial,
                rest_direccion,
                rest_telefono,
                rest_lat,
                rest_lng,
                rest_info,
                rest_img: nombreYExtension,
                rest_refUbicacion,
                rest_dAtencion,
                rest_hApertura,
                rest_hCierre,
                rest_avisos,
                rest_estado,
                rest_verificacion,
                usu_id
            }).then((restaurante: any) => {
                if (restaurante) {
                    res.status(201).json({
                        message: 'Ok',
                        content: restaurante
                    });
                } else {
                    res.status(400).json( {
                        message: 'Error',
                        content: 'Error al crear restaurante'
                    });
                }
            }).catch((error: any) => {
                res.send(error);
                console.log("Error => " + error);
            });
        }
        */
    },
    deleteById: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.Restaurante.update({
            rest_estado: 0
        }, {
            where: {
                rest_id
            }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al eliminar restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    upDateById: (req, res) => {
        let { rest_id } = req.params;
        sequelize_1.Restaurante.update(req.body, {
            where: { rest_id }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getImagenByName: (req, res) => {
        let ruta = `images/${req.params.name}`;
        let rutaDefault = `images/default.png`;
        if (fs.existsSync(ruta)) {
            return res.sendFile(path_module.resolve(ruta));
        }
        else {
            return res.sendFile(path_module.resolve(rutaDefault));
        }
    },
    getById: (req, res) => {
        let { id } = req.params;
        sequelize_1.Restaurante.findAll({
            where: {
                rest_id: id
            }
        }).then((restaurante) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurante'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};
