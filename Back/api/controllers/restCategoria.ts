// RESTAURANTE-CATEGORIA CONTROLLERS

import { Request, Response } from 'express';
import { RestCategoria } from './../config/sequelize'

export var restcategoria_control = {
    create: (req: Request, res: Response) => {
        RestCategoria.create(req.body).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear categoria con restaurante'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    delete: (req: Request, res: Response) => {
        let { rest_id, cat_id } = req.body
        RestCategoria.destroy({ where: { rest_id, cat_id } }).then((respuesta: any) => {
            if (respuesta) {
                res.status(201).json({
                    message: 'Ok',
                    content: respuesta
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al eliminar categoria con restaurante'
                });
            }

        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    traerRestById:(req:Request, res:Response)=>{
        let {id_rest} = req.params;
        RestCategoria.findAll({
            where:{
                rest_id:id_rest
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
                    content: 'Restaurante no encontrado'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    traerCatById:(req:Request, res:Response)=>{
        let {id_cat} = req.params;
        RestCategoria.findAll({
            where:{
                cat_id:id_cat
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
                    content: 'Restaurante no encontrado'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }
}