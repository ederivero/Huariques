// USUARIO CONTROLLERS

import { Request, Response } from 'express';
import { Usuario } from './../config/sequelize'

export var usuario_control = {

    getAll: (req: Request, res: Response) => {
        Usuario.findAll().then((usuario: any) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer usuarios'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    getByEmail: (req: Request, res: Response) => {
        let { correo } = req.params;
        Usuario.findAll({ where: { usu_email: correo } }).then((usuario: any) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Usuario no encontrado'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        Usuario.create(req.body).then((usuario: any) => {
            if (usuario) {
                res.status(400).json({
                    message: 'Ok',
                    content: usuario
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear usuario'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    // usuario no se puede crear DELETE puesto que generaria inconsistencia en las relaciones
    /*
    deleteById: (req: Request, res: Response) => {
        let { usu_id } = req.params;
        Usuario.destroy({
            where: {
                prod_id: prod_id
            }
        }).then((usuario: any) => {
            if (usuario) {
                let response = {
                    message: 'Ok',
                    content: usuario
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error al eliminar usuario',
                    content: usuario
                };
                res.status(400).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    },
    */
    upDateById: (req: Request, res: Response) => {

        let { id } = req.params;

        Usuario.update(req.body, {
            where: { usu_id: id }
        }
        ).then((usuario: any) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            } else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar usuario'
                });
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }

}