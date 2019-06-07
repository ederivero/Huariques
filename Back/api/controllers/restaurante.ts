// RESTAURANTE CONTROLLERS

import { Request, Response } from 'express';
import { Restaurante } from './../config/sequelize';
const Sequelize = require('sequelize');

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
                res.status(200).json({
                    message: 'Ok',
                    content: respuesta
                })
            } else {
                res.status(400).json({
                    message: 'Not found'
                })
            }
        })
    },
    getAll: (req: Request, res: Response) => {
        Restaurante.findAll().then((restaurante: any) => {
            if (restaurante) {
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer restaurantes'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        if (req.files) {
            let ruta = req.files.rest_img.path;
            let ruta2='';
            for (let i = 7; i < ruta.length; i++) {
                ruta2=ruta2+ruta[i]
            }
            //let nombreYExtension = ruta.split('images\\')[1];
            let { rest_rSocial, rest_direccion, rest_telefono, rest_lat, rest_lng, rest_info, rest_refUbicacion, rest_dAtencion, rest_hApertura, rest_hCierre, rest_avisos, rest_estado, rest_verificacion, usu_id } = req.body;
            Restaurante.create({
                rest_rSocial,
                rest_direccion,
                rest_telefono,
                rest_lat,
                rest_lng,
                rest_info,
                rest_img: ruta2,
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
                    let response = {
                        message: 'Ok',
                        content: restaurante
                    };
                    res.status(201).json(response);
                } else {
                    let response = {
                        message: 'Error',
                        content: 'Error al crear restaurante'
                    };
                    res.status(400).json(response);
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
                    let response = {
                        message: 'Ok',
                        content: restaurante
                    };
                    res.status(200).json(response);
                } else {
                    let response = {
                        message: 'Error al eliminar restaurante',
                        content: restaurante
                    };
                    res.status(201).json(response);
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
                let response = {
                    message: 'Ok',
                    content: restaurante
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al actualizar restaurante',
                    content: restaurante
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }

}