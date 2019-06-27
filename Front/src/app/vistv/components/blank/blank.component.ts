import { Component, OnInit, Input } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ModelInforestComponent } from '../model-inforest/model-inforest.component';
import { ActivatedRoute } from '@angular/router';


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
  restInfo = [ ]
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
  restId: number;

  pos: number;
  result: any[];

  noHayRest = true;
  leer= true;

  constructor(public dialog: MatDialog, ruta: ActivatedRoute) {
    // if(localStorage.getItem('horarios')){
    //   this.listHorarios = JSON.parse(localStorage.getItem('horarios'));

    //   console.log(this.listHorarios.map((cont)=>{
    //     return (cont.h_abierto );
    //   }));
    // }

    this.usuId = +ruta.snapshot.params.usuId
    this.restId = +ruta.snapshot.params.restId

    this.pos = this.restId-1

    fetch(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${this.usuId}`)
      .then(response => {
        // console.log("SFsfsgsgs");
        return response.json()
      }).then(datarest => {
        // console.log(datarest.content);
        // console.log(usuId);
        // console.log(restId);

        this.result = this.getElementByPosition(datarest.content,this.pos)
        // console.log(this.result);
        

        this.cargado = true
        this.noHayRest = false;
        datarest.content.forEach(idRest => {

          this.r_id = idRest.rest_id;
          this.r_soc = idRest.rest_rSocial;
          this.r_dir = idRest.rest_direccion;
          this.r_img = idRest.rest_img

          // this.restInfo.push({
          //   rId: idRest.rest_id,
          //   rSocial: idRest.rest_rSocial,
          //   rDir: idRest.rest_direccion,
          //   img: idRest.rest_img
          // })

        });
        console.log(this.r_soc);

      })


    fetch(`https://huariquesback.herokuapp.com/api/producto/porIdRest/${this.restId}`)
      .then(response => {
        // console.log("productos");
        return response.json()
      }).then(dataprod => {

        // console.log(dataprod.content);

        dataprod.content.forEach(idForProd => {
          // console.log(idForRest);

          console.log(this.id_prod = idForProd.prod_id);
          this.p_desc = idForProd.prod_desc;
          this.p_disp = idForProd.prod_disp;
          this.p_nomb = idForProd.prod_nom;
          this.p_prec = idForProd.prod_precio;
          this.p_imagen = idForProd.prod_img;

          if (!this.p_imagen) {
            this.p_imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
          }

          this.cargado = true;

          // this.p_cadauno.push({
          //   pId: idForProd.prod_id,
          //   pDesc: idForProd.prod_desc,
          //   pDisp: idForProd.prod_disp,
          //   pNom: idForProd.prod_nom,
          //   pPre: idForProd.prod_precio,
          //   img: idForProd.prod_img

          // })

        })

        // console.log(this.p_cadauno);
        // 


      })


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
    if (position>1) {
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





  };

  crearHorario() {
    let objMarcador = this.horario;
    this.listHorarios.push(objMarcador);
    localStorage.setItem("horarios", JSON.stringify(this.listHorarios));


  }

}
