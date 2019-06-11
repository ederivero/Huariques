import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModelInforestComponent } from '../model-inforest/model-inforest.component';


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
  name: string;

  checked = true;


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
  

  constructor(public dialog: MatDialog) { 
    if(localStorage.getItem('horarios')){
      this.listHorarios = JSON.parse(localStorage.getItem('horarios'));
    
      console.log(this.listHorarios.map((cont)=>{
        return (cont.h_abierto );
      }));
    }
  }





  ngOnInit() {
    console.log(this.listHorarios);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModelInforestComponent, {
      width: '550px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  };

  habilitarEdicion(){
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
    this.CheckDay = document.getElementById("divBtnEdit").removeAttribute("hidden");

    this.estadoBtnEdit = false;
    this.estadoBtnGuard = true;
  };

  guardarInfo(){

    this.inputNom = document.getElementById("rest_nom").setAttribute("readonly","readonly");
    this.inputRef = document.getElementById("rest_ref").setAttribute("readonly","readonly");
    this.inputInfo = document.getElementById("rest_info").setAttribute("readonly","readonly");
    this.inputhi = document.getElementById("h_abierto").setAttribute("readonly","readonly");
    this.inpuths = document.getElementById("h_cerrado").setAttribute("readonly","readonly");
    
    this.selectHor =  document.getElementById("selectHor").setAttribute("hidden","readonly");
    this.selectDia = document.getElementById("selectDia").setAttribute("hidden","readonly");
    this.h_abierto =  document.getElementById("h_abierto").setAttribute("hidden","readonly");
    this.h_cerrado = document.getElementById("h_cerrado").setAttribute("hidden","readonly");
    // this.a = document.getElementById("a").setAttribute("hidden","readonly");


    this.BtnEdit = document.getElementById("checkDia").setAttribute("hidden","readonly");
    this.CheckDay = document.getElementById("divBtnEdit").setAttribute("hidden","readonly");
    
    this.estadoBtnEdit = true
    this.estadoBtnGuard = false



  };

  crearHorario(){
    let objMarcador = this.horario;
    this.listHorarios.push(objMarcador);
     localStorage.setItem("horarios",JSON.stringify(this.listHorarios));


  }

}
