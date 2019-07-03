import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelInforestComponent } from '../model-inforest/model-inforest.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';


// export interface Dialog
export interface DialogData {
  animal: string;
  name: string;
}



@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss']
})

export class BlankComponent implements OnInit {

  animal: string;
  // name: string;


  prub = [


    {
      primer: "Claudia"
    },
    {
      primer: "Yuleymi"
    }


  ]




  myJsonString = JSON.stringify(this.prub);




  inputNom;
  inputRef;
  inputInfo;
  inputhi;
  inpuths;
  BtnEdit;
  CheckDay;
  selectHor;
  selectDia;
  h_abierto;
  h_cerrado;
  a;
  estadoBtnEdit = true;
  estadoBtnGuard = false;


  horario = {
    h_abierto: '',
    h_cerrado: ''
  }

  listHorarios = [];
  restInfo = []
  r_soc: any;
  r_id: any;
  r_dir: any;
  r_img: any;

  id_prod: any;
  p_desc: any;
  p_disp: any;
  p_nomb: any;
  p_prec: any;
  p_imagen: any;

  cargado = false;
  p_cadauno = [];
  dataSource;

  @Input() usuId: number;
  // restId: number;

  pos: number;
  result=[
    // rest_id: '',
    // rest_rSocial: idForRest.rest_rSocial,
    // rest_direccion: idForRest.rest_direccion,
    // rest_img: idForRest.rest_img
  ];

  noHayRest = true;
  leer = true;
  user: any;
  tipoUsu: any;
  suscriptor: any;
  rest_rSocialM: any;
  rest_direccionM: any;
  imagen: any;
  load: boolean;
  cadauno = [];

  @Input() restId;
  IdRest: any;
  infoRest: any;


  constructor(public dialog: MatDialog,
    ruta: ActivatedRoute,
    private _authServ: AuthServiceLocal,
    private _sRest: RestService,
    private _router: Router
  ) {

    if (localStorage.getItem('idR')) {
      this.restId = JSON.parse(localStorage.getItem('idR'));
      console.log(this.restId);
      

      this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        console.log(this.user);
        this.user.forEach((e) => {
          this.usuId = e.usu_id;
          this.tipoUsu = e.usu_tipo;
        })
        console.log(this.usuId);
  
        if (this.tipoUsu == 0) {
          this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {
  
            // this.restId = this._sRest.recibirRest()
            // console.log(this.restId);
  
            this.infoRest = this._sRest.getInfoRest(this.restId).subscribe((dataInfoRest: any) => {
              console.log(dataInfoRest.content);
  
              dataInfoRest.content.forEach(idForRest => {
  
                this.result.push({
                  rest_id: idForRest.rest_id,
                  rest_rSocial: idForRest.rest_rSocial,
                  rest_direccion: idForRest.rest_direccion,
                  rest_img: idForRest.rest_img,
                  rest_dAtencion: idForRest.rest_dAtencion,
                  rest_refUbicacion: idForRest.rest_refUbicacion,
                  rest_hApertura: idForRest.rest_hApertura,
                  rest_hCierre: idForRest.rest_hCierre,
                  rest_info:idForRest.rest_info
  
                })
  
  
              });
              console.log(this.result);
              
  
              this.load = true;
              this.cargado = true
              this.noHayRest = false;
  
            })
  
    
          })
        } else {
          this._router.navigateByUrl('');
        }
  
      })

    }else{

    this.restId = this._sRest.getIdRest();

    console.log(this.restId);


    this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
      this.user = res.content;
      console.log(this.user);
      this.user.forEach((e) => {
        this.usuId = e.usu_id;
        this.tipoUsu = e.usu_tipo;
      })
      console.log(this.usuId);

      if (this.tipoUsu == 0) {
        this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {

          // this.restId = this._sRest.recibirRest()
          // console.log(this.restId);

          this.infoRest = this._sRest.getInfoRest(this.restId).subscribe((dataInfoRest: any) => {
            console.log(dataInfoRest.content);

            dataInfoRest.content.forEach(idForRest => {

              this.result.push({
                rest_id: idForRest.rest_id,
                rest_rSocial: idForRest.rest_rSocial,
                rest_direccion: idForRest.rest_direccion,
                rest_img: idForRest.rest_img,
                rest_dAtencion: idForRest.rest_dAtencion,
                rest_refUbicacion: idForRest.rest_refUbicacion,
                rest_hApertura: idForRest.rest_hApertura,
                rest_hCierre: idForRest.rest_hCierre,
                rest_info:idForRest.rest_info

              })


            });
            console.log(this.result);
            

            this.load = true;
            this.cargado = true
            this.noHayRest = false;

          })


          // console.log(datarest.content);

          // datarest.content.forEach(idForRest => {
          //   // console.log(idForRest);

          //   console.log(this.rest_rSocialM = idForRest.rest_rSocial);
          //   this.rest_direccionM = idForRest.rest_direccion;
          //   this.imagen = idForRest.rest_img;
          //   this.noHayRest = false;

          //   if (!this.imagen) {
          //     this.imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
          //   }

          // this.load =  true;
          // this.cargado = true
          // this.noHayRest = false;

          // this.cadauno.push({
          //   rId: idForRest.rest_id,
          //   rSocial: idForRest.rest_rSocial,
          //   rDir: idForRest.rest_direccion,
          //   img: idForRest.rest_img

          // })

          // })
          // console.log(this.cadauno);

        })
      } else {
        this._router.navigateByUrl('');
      }

    })

    }

  }





  ngOnInit() {
    // console.log(this.listHorarios);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelInforestComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  };

  getElementByPosition(array, position) {

    var elemento = [];
    if (position > 1) {
      var reem = position - 1
      elemento = array[reem];
      console.log(reem);

      // console.log(elemento);

      // this.load = true;
      return elemento;

    } else {
      elemento = array[position];
      console.log(position);

      // console.log(elemento);
      // this.load = true;
      return elemento;

    }



  }

  habilitarEdicion() {
    this.inputNom = document.getElementById("rest_nom").removeAttribute("readonly");
    this.inputRef = document.getElementById("rest_ref").removeAttribute("readonly");
    this.inputInfo = document.getElementById("rest_info").removeAttribute("readonly");
    this.inputhi = document.getElementById("h_abierto").removeAttribute("readonly");
    this.inpuths = document.getElementById("h_cerrado").removeAttribute("readonly");

    this.selectHor = document.getElementById("selectHor").removeAttribute("hidden");
    this.selectDia = document.getElementById("selectDia").removeAttribute("hidden");
    this.h_abierto = document.getElementById("h_abierto").removeAttribute("hidden");
    this.h_cerrado = document.getElementById("h_cerrado").removeAttribute("hidden");
    // this.a= document.getElementById("a").removeAttribute("hidden");


    this.BtnEdit = document.getElementById("checkDia").removeAttribute("hidden");

    this.estadoBtnEdit = false;
    this.estadoBtnGuard = true;
    this.leer = false

    console.log(this.usuId);
    console.log(this.restId);

  };

  guardarInfo() {

    this.inputNom = document.getElementById("rest_nom").setAttribute("readonly", "readonly");
    this.inputRef = document.getElementById("rest_ref").setAttribute("readonly", "readonly");
    this.inputInfo = document.getElementById("rest_info").setAttribute("readonly", "readonly");
    this.inputhi = document.getElementById("h_abierto").setAttribute("readonly", "readonly");
    this.inpuths = document.getElementById("h_cerrado").setAttribute("readonly", "readonly");

    this.selectHor = document.getElementById("selectHor").setAttribute("hidden", "readonly");
    this.selectDia = document.getElementById("selectDia").setAttribute("hidden", "readonly");
    this.h_abierto = document.getElementById("h_abierto").setAttribute("hidden", "readonly");
    this.h_cerrado = document.getElementById("h_cerrado").setAttribute("hidden", "readonly");
    // this.a = document.getElementById("a").setAttribute("hidden","readonly");


    this.BtnEdit = document.getElementById("checkDia").setAttribute("hidden", "readonly");

    this.estadoBtnEdit = true;
    this.estadoBtnGuard = false;
    this.leer = true;


    console.log(this.prub);


    console.log(this.myJsonString);


    // fetch(`https://huariquesback.herokuapp.com/api/restaurante/actualizar/${restId}`)
    // .then(response => {
    //   return response.json()
    // }).then(datarest => {
    //   console.log(datarest.content)
    // })


  };

  crearHorario() {
    let objMarcador = this.horario;
    this.listHorarios.push(objMarcador);
    localStorage.setItem("horarios", JSON.stringify(this.listHorarios));


  }

}
