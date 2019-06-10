"use strict";
// USUARIO CONTROLLERS
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("./../config/sequelize");
exports.usuario_control = {
    getAll: (req, res) => {
        sequelize_1.Usuario.findAll().then((usuario) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al traer usuarios'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    getByEmail: (req, res) => {
        let { correo } = req.params;
        sequelize_1.Usuario.findAll({ where: { usu_email: correo } }).then((usuario) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Usuario no encontrado'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    },
    create: (req, res) => {
        sequelize_1.Usuario.create(req.body).then((usuario) => {
            if (usuario) {
                res.status(400).json({
                    message: 'Ok',
                    content: usuario
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al crear usuario'
                });
            }
        }).catch((error) => {
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
    upDateById: (req, res) => {
        let { id } = req.params;
        sequelize_1.Usuario.update(req.body, {
            where: { usu_id: id }
        }).then((usuario) => {
            if (usuario) {
                res.status(201).json({
                    message: 'Ok',
                    content: usuario
                });
            }
            else {
                res.status(400).json({
                    message: 'Error',
                    content: 'Error al actualizar usuario'
                });
            }
        }).catch((error) => {
            console.log("Error => " + error);
        });
    }
};
