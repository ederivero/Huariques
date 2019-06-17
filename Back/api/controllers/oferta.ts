// OFERTA CONTROLLERS

import { Request, Response } from 'express';
import { Oferta } from './../config/sequelize';
import { subirArchivo } from '../utils/SubirArchivoFirebase'

export var oferta_control = {
    create: (req: any, res: Response) => {
        let imagen = req.file;
        if (imagen) {
            subirArchivo(imagen, 'ofertas').then((link: any) => {
                let { ofer_tipo, ofer_disp, prod_id } = req.body;
                let parametros = {
                    ofer_tipo, ofer_disp, prod_id,
                    ofer_img: link[0]
                };
                Oferta.create(parametros).then((respuesta: any) => {
                    if (respuesta) {
                        res.status(201).json({
                            message: 'Ok',
                            content: respuesta
                        });
                    } else {
                        res.status(400).json({
                            message: 'Error',
                            content: 'Error al crear oferta'
                        });
                    }
                }).catch((error: any) => {
                    console.log("Error => " + error);
                });
            })
        } else {
            res.status(400).json({ error: 'No hay archivos' })
        }
    },
    update: (req: any, res: Response) => {
        let imagen = req.file;
        if (imagen) {
            subirArchivo(imagen, 'ofertas').then((link: any) => {
                let { prod_id } = req.params;
                let { ofer_tipo, ofer_disp } = req.body;
                let parametros = {
                    ofer_tipo, ofer_disp,
                    ofer_img: link[0]
                };
                Oferta.update(parametros, {
                    where: { prod_id }
                }
                ).then((restaurante: any) => {
                    if (restaurante) {
                        res.status(200).json({
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
            })
        } else {
            res.status(400).json({ error: 'No hay archivos' })
        }

    }
}