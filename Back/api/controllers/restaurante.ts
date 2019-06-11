// RESTAURANTE CONTROLLERS

import { Request, Response } from 'express';
import { Restaurante } from './../config/sequelize';
const Sequelize = require('sequelize');

const formidable = require('formidable');

var path_module = require('path');
var fs = require('fs');

import * as firebase from 'firebase';
const Op = Sequelize.Op;
export var restaurante_control = {
    findByLike: (req: Request, res: Response) => {
        let { palabra } = req.params;
        Restaurante.findAll({
            where: {
                rest_rSocial: {
                    [Op.like]: '%' + palabra + '%'
                }
            }
        }).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al encontrar restaurante'
                })
            }
        })
    },
    getAll: (req: Request, res: Response) => {
        Restaurante.findAll().then((restaurante: any) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurantes'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {

        var firebaseConfig = {
            apiKey: "AIzaSyCjnrjecGjB6lN1P7BmJDH_CnhXOoAgVVI",
            authDomain: "api-project-161182547768.firebaseapp.com",
            databaseURL: "https://api-project-161182547768.firebaseio.com",
            projectId: "api-project-161182547768",
            storageBucket: "api-project-161182547768.appspot.com",
            messagingSenderId: "161182547768",
            appId: "1:161182547768:web:482e5f8c565fb2a4"
        };

        new formidable.IncomingForm().parse(req, (err: any, fields: any, files: any) => {
            if (err) {
                console.error('Error', err)
                throw err
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
        })
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
    deleteById: (req: Request, res: Response) => {
        let { rest_id } = req.params;
        Restaurante.update({
            rest_estado: 0
        }, {
                where: {
                    rest_id
                }
            }).then((restaurante: any) => {
                if (restaurante) {
                    res.status(201).json({
                        message: 'Ok',
                        content: restaurante
                    });
                } else {
                    res.status(400).json({
                        message: 'Error',
                        content: 'Error al eliminar restaurante'
                    });
                }
            }).catch((error: any) => {
                console.log("Error => " + error);
            });
    },
    upDateById: (req: Request, res: Response) => {

        let { rest_id } = req.params;

        Restaurante.update(req.body, {
            where: { rest_id }
        }
        ).then((restaurante: any) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar restaurante'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    getImagenByName: (req: Request, res: Response) => {
        let ruta = `images/${req.params.name}`;
        let rutaDefault = `images/default.png`;
        if (fs.existsSync(ruta)) {
            return res.sendFile(path_module.resolve(ruta));
        } else {
            return res.sendFile(path_module.resolve(rutaDefault));
        }
    },
    getById: (req: Request, res: Response) => {
        let { id } = req.params;
        Restaurante.findAll({
            where: {
                rest_id: id
            }
        }).then((restaurante: any) => {
            if (restaurante) {
                res.status(201).json({
                    message: 'Ok',
                    content: restaurante
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer restaurante'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }

}