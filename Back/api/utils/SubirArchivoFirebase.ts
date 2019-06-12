import { resolve, reject } from "bluebird";

// Imports the Google Cloud client library.
const { Storage } = require('@google-cloud/storage');
const express = require('express');
const app = express();
// Instantiates a client. Explicitly use service account credentials by
// specifying the private key file. All clients in google-cloud-node have this
// helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md

//Variable para guardar el id del proyecto y el filename que eso se descarga en https://cloud.google.com/docs/authentication/production#auth-cloud-implicit-nodejs
const api = {
    projectId: 'api-project-161182547768',
    keyFilename: './Imagenes_Huariques-9fe9ddb353c1.json'

}
const storage = new Storage(api);

//se crea la variable bucket que usa como referencia el link del storage
const bucket = storage.bucket('api-project-161182547768.appspot.com');

export let subirArchivo = (imagen: any, carpeta: any) => {
    return new Promise((resolve,reject)=>{
        if(!imagen){
            reject('No hay imagen')
        }
        let newFileName = `${carpeta}/${imagen.originalname}_${Date.now()}`;

        let fileUpload = bucket.file(newFileName);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: imagen.mimetype
            }
        });
        blobStream.on('error', (error:any) => {
            reject('Something is wrong! Unable to upload at the moment.');
        });
        blobStream.on('finish', () => {
            fileUpload.getSignedUrl({
                action:'read',
                expires: '12-12-2491'
            }).then((link:any) =>{
                resolve(link);
            })
        });

        blobStream.end(imagen.buffer);
    })

    // if (imagen) {

    //     let newFileName = `${carpeta}/${imagen.originalname}_${Date.now()}`;

    //     let fileUpload = bucket.file(newFileName);

    //     const blobStream = fileUpload.createWriteStream({
    //         metadata: {
    //             contentType: imagen.mimetype
    //         }
    //     });
    //     blobStream.on('error', (error:any) => {
    //         console.log(error);
            
    //         rpta=({message:'Something is wrong! Unable to upload at the moment.'});
    //     });

    //     blobStream.on('finish', () => {
    //         fileUpload.getSignedUrl({
    //             action:'read',
    //             expires: '12-12-2491'
    //         }).then((link:any) =>{
    //             rpta=({link});
    //         })
    //     });

    //     blobStream.end(imagen.buffer);

    // }
    // else {
    //     rpta: ({ error: 'No hay archivos', codigo: 2 })
    // }
}