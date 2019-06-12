// USUARIO CONTROLLERS

import { Request, Response } from 'express';
import { Usuario } from './../config/sequelize';
import { subirArchivo } from '../utils/SubirArchivoFirebase';
export var usuario_control = {
    login: (req: Request, res: Response) => {
        let { usu_email, usu_pass } = req.body;
        // findOne => 
        Usuario.findOne({
            where: {
                usu_email: usu_email
            }
        }).then((objUsuario: any) => {
            if (objUsuario) {
                // el usuario existe => validar la contra
                let valid = objUsuario.validPassword(usu_pass);
                if (valid) {
                    // contrasenia correcta
                    let token = objUsuario.generateJWT();
                    let response = {
                        message: 'ok',
                        token: token
                    };
                    res.status(201).json(response);
                } else {
                    // contrasenia incorrecta
                    let response = {
                        message: 'error',
                        content: 'Usuario o password incorrecto'
                    };
                    res.status(400).json(response);
                }
            } else {
                // si es null
                let response = {
                    message: 'error',
                    content: 'Usuario o password incorrecto'
                };
                res.status(500).json(response);
            }
        })
    },
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
    getById: (req: Request, res: Response) => {
        let { id } = req.params;
        Usuario.findAll({ where: { usu_id: id } }).then((usuario: any) => {
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
    create: (req: any, res: Response) => {
        let imagen = req.file;
        if (imagen) {
            subirArchivo(imagen, 'usuarios').then((link: any) => {
                let { usu_email, usu_nom, usu_ape, usu_tel, usu_pass, usu_tipo } = req.body;
                let parametros = {
                    usu_email,
                    usu_nom,
                    usu_ape,
                    usu_tel,
                    usu_pass,
                    usu_tipo,
                    usu_img: link[0]
                };
                Usuario.findAll({
                    where: {
                        usu_email
                    }
                }).then((usuarios: any) => {
                    if (usuarios.length === 0) {
                        // -- AQUI -- //
                        // Instanciando un objeto del modelo Usuario
                        let objUsuario = Usuario.build(parametros);
                        objUsuario.setSaltAndHash(req.body.usu_pass);
                        objUsuario.save().then((usuarioCreado: any) => {
                            let token = usuarioCreado.generateJWT();
                            if (usuarioCreado && token) {
                                let response = {
                                    message: 'created',
                                    content: usuarioCreado,
                                    token: token,
                                };
                                res.status(201).json(response);
                            } else {
                                let response = {
                                    message: 'error',
                                    content: 'Erro al crear el usuario y/o token',
                                };
                                res.status(500).json(response);
                            }
                        });
                        // </aqui>
                    } else {
                        let response = {
                            message: 'error',
                            content: `El usuario con email ${req.body.usu_email} ya existe`,
                        };
                        res.status(500).json(response);
                    }
                })
            })
        } else {
            res.status(400).json({ error: 'No hay archivos' })
        }
    },
    upDateById: (req: any, res: Response) => {
        let imagen = req.file;
        if (imagen) {
            subirArchivo(imagen, 'usuarios').then((link: any) => {
                let { usu_email, usu_nom, usu_ape, usu_tel, usu_pass, usu_tipo } = req.body;
                let parametros = {
                    usu_email,
                    usu_nom,
                    usu_ape,
                    usu_tel,
                    usu_pass,
                    usu_tipo,
                    usu_img: link[0]
                };
                let { id } = req.params;
                Usuario.update(parametros, {
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
            })
        } else {
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

}