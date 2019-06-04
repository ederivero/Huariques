// USUARIO CONTROLLERS

import { Request, Response } from 'express';
import { Usuario } from './../config/sequelize'

export var usuario_control = {

    getAll: (req: Request, res: Response) => {
        Usuario.findAll().then((usuario: any) => {
            if (usuario) {
                let response = {
                    message: 'Ok',
                    content: usuario
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer usuarios'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    getByEmail: (req: Request, res: Response) => {
        let { usu_email } = req.params;
        Usuario.findAll({ where: { usu_email }  }).then((usuario: any) => {
            if (usuario) {
                let response = {
                    message: 'Ok',
                    content: usuario
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'usuuto no encontrado'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    },
    create: (req: Request, res: Response) => {
        Usuario.create(req.body).then((usuario: any) => {
            if (usuario) {
                let response = {
                    message: 'Ok',
                    content: usuario
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear usuario'
                };
                res.status(400).json(response);
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
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al eliminar usuario',
                    content: usuario
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    },
    */
    upDateById: (req: Request, res: Response) => {

        let { usu_id } = req.params;

        Usuario.update(req.body, {
            where: { usu_id }
        }
        ).then((usuario: any) => {
            if (usuario) {
                let response = {
                    message: 'Ok',
                    content: usuario
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al actualizar usuario',
                    content: usuario
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {
            console.log("Error => " + error);
        });
    }

}