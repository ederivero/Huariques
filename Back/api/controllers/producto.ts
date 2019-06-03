
// PRODUCTO CONTROLLERS

import { Request, Response } from 'express';
import { Producto } from './../config/sequelize'

export var producto_control = {

    getAll: (req: Request, res: Response) => {
        Producto.findAll().then((producto: any) => {  
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al traer productos'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
        });
    },
    getById: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Producto.findByPk(prod_id).then((producto: any) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Produto no encontrado'
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    },
    create: (req: Request, res: Response) => {
        Producto.create(req.body).then((producto: any) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(201).json(response);
            } else {
                let response = {
                    message: 'Error',
                    content: 'Error al crear producto'
                };
                res.status(400).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    },    
    deleteById: (req: Request, res: Response) => {
        let { prod_id } = req.params;
        Producto.destroy({
            where: {
                prod_id: prod_id
            }
        }).then((producto: any) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al eliminar producto',
                    content: producto
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    },
    upDateById: (req: Request, res: Response) => {

        let { prod_id } = req.params;

        Producto.update(req.body, {
            where: { prod_id:prod_id }
        }
        ).then((producto: any) => {
            if (producto) {
                let response = {
                    message: 'Ok',
                    content: producto
                };
                res.status(200).json(response);
            } else {
                let response = {
                    message: 'Error al actualizar producto',
                    content: producto
                };
                res.status(201).json(response);
            }
        }).catch((error: any) => {console.log("Error => "+error);
    });
    }

}
