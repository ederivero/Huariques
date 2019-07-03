import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelInforestComponent } from '../../vistv/components/model-inforest/model-inforest.component';
import { McrearRestComponent } from '../mcrear-rest/mcrear-rest.component';
import { ActivatedRoute, Router } from "@angular/router";
import { RestService } from 'src/app/services/rest.service';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { BlankComponent } from 'src/app/vistv/components/blank/blank.component';




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
  suscriptor: Subscription;
  usuId: any;
  user: any;
  tipoUsu: any;

  @ViewChild('test', {static: false}) vistv:BlankComponent;
  idRest: any;
  newId: any;


  constructor(public dialog: MatDialog, 
                      ruta: ActivatedRoute,
              private _authServ:AuthServiceLocal,
              private _sRest: RestService,
              private _router: Router
              ) {
          
      this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        console.log(this.user);   
        this.user.forEach((e)=>{
          this.usuId = e.usu_id;
          this.tipoUsu = e.usu_tipo;
        })
        console.log(this.usuId);

        if (this.tipoUsu == 0) {
          this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {
            console.log(datarest.content);
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
        } else {
          this._router.navigateByUrl('');
        }        
          
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

  adminRest(idRest){
    console.log(idRest);
    this._router.navigateByUrl(`/vistv`);
    this.newId = this._sRest.adminRest(idRest);
    this._sRest.setRest(idRest)
    
    return this.newId;
    
  }
}


