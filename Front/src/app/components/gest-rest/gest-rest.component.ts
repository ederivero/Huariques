import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModelInforestComponent} from '../../vistv/components/model-inforest/model-inforest.component';
import { McrearRestComponent } from '../mcrear-rest/mcrear-rest.component';
import { ActivatedRoute } from "@angular/router";



@Component({
  selector: 'app-gest-rest',
  templateUrl: './gest-rest.component.html',
  styleUrls: ['./gest-rest.component.scss']
})
export class GestRestComponent implements OnInit {

  rest_rSocialM;
  rest_direccionM;
  imagen;

  load = false;


  constructor(public dialog: MatDialog, ruta: ActivatedRoute) {
    var rutaActual = ruta.snapshot.params.id
    fetch(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${rutaActual}`).then(response => {
      this.load = true;
      return response.json()
    }).then(datacat => {
      console.log(datacat.content)
 
      // datacat.content.forEach(idcat => {
      //   this.categoriasruta.push({ruta:"./assets/images/"+idcat.cat_id+".png"})
      // })
      console.log(
       this.rest_rSocialM= datacat.content[0].rest_rSocial);
      this.rest_direccionM= datacat.content[0].rest_direccion;
      this.imagen = datacat.content[0].rest_img;
      if (!this.imagen) {
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
      }
    })
   }

  ngOnInit() {

  }

  openDialog() {
    const dialogRef = this.dialog.open(McrearRestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


