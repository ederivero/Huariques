// RESTAURANTE CONTROLLERS

import { Request, Response } from 'express';
import { Restaurante } from './../config/sequelize';
const Sequelize = require('sequelize');
var path_module = require('path');
var fs = require('fs');

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
    getImagenByName:(req:Request, res:Response)=>{
        let ruta = `images/${req.params.name}`;
        let rutaDefault = `images/default.png`;
        if(fs.existsSync(ruta)){
            return res.sendFile(path_module.resolve(ruta));
        }else{
            return res.sendFile(path_module.resolve(rutaDefault));
        }
    }

}