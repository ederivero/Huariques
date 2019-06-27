import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelInforestComponent } from '../../vistv/components/model-inforest/model-inforest.component';
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

  noHayRest = true;

  load = false;
  cadauno= [];
  aunNRest =false;
  prueba = []

  constructor(public dialog: MatDialog, ruta: ActivatedRoute) {
    var usuId = ruta.snapshot.params.id
    fetch(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${usuId}`)
      .then(response => {
        return response.json()
      }).then(datarest => {
          
        
        console.log(datarest.content)

        this.showMessageSuccess();

        datarest.content.forEach(idForRest => {
          // console.log(idForRest);

          console.log(this.rest_rSocialM = idForRest.rest_rSocial);
          this.rest_direccionM = idForRest.rest_direccion;
          this.imagen = idForRest.rest_img;
          this.noHayRest = false;
          
          if (!this.imagen) {
            this.imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
          }

          this.load = true;

          this.cadauno.push({
            rId: idForRest.rest_id,
            rSocial: idForRest.rest_rSocial,
            rDir: idForRest.rest_direccion,
            img:idForRest.rest_img

          })

          if (datarest.content == this.prueba) {
            this.noHayRest = false;
            this.aunNRest = true;
          }
        })

        console.log(this.cadauno);
        
      })
    
  }

  ngOnInit() {

  }

  showMessageSuccess(){

    this.aunNRest = false;

    setTimeout(function(){
      this.noHayRest= false;
      this.aunNRest = true;

    },1500);

  }

  openDialog() {
    const dialogRef = this.dialog.open(McrearRestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


