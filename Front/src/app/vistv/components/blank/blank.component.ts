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


  inputNom;
  inputRef;
  inputInfo;
  inputhi;
  inpuths;
  BtnEdit;
  CheckDay;
  btnEdit;
  btnGuardar;
  estadoBtnEdit = true;
  estadoBtnGuard = false;
  mostH = true;
  editH = false;

  horario = {
    h_abierto: '',
    h_cerrado: ''
  }
  
  listHorarios = [];
  

  constructor(public dialog: MatDialog) { 
    if(localStorage.getItem('horarios')){
      this.listHorarios = JSON.parse(localStorage.getItem('horarios'));
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
    
    // this.mostH = false;
    // this.editH = true;
    
    this.BtnEdit = document.getElementById("checkDia").removeAttribute("hidden");
    this.CheckDay = document.getElementById("divBtnEdit").removeAttribute("hidden");

    this.estadoBtnEdit = false
    this.estadoBtnGuard = true
    // this.btnEdit = document.getElementById("btnEditInfo").setAttribute("hidden","hidden");
    // this.btnGuardar = document.getElementById("btnGuarInfo").removeAttribute("hidden");
  };

  guardarInfo(){

    this.inputNom = document.getElementById("rest_nom").setAttribute("readonly","readonly");
    this.inputRef = document.getElementById("rest_ref").setAttribute("readonly","readonly");
    this.inputInfo = document.getElementById("rest_info").setAttribute("readonly","readonly");
    this.inputhi = document.getElementById("h_abierto").setAttribute("readonly","readonly");
    this.inpuths = document.getElementById("h_cerrado").setAttribute("readonly","readonly");
    
    // this.mostH = true;
    // this.editH = false;
    this.BtnEdit = document.getElementById("checkDia").setAttribute("hidden","readonly");
    this.CheckDay = document.getElementById("divBtnEdit").setAttribute("hidden","readonly");
    
    this.estadoBtnEdit = true
    this.estadoBtnGuard = false

    // this.btnEdit = document.getElementById("btnEditInfo").removeAttribute("hidden");
    // this.btnGuardar = document.getElementById("btnGuarInfo").setAttribute("hidden","hidden");


  };

  crearHorario(){
    let objMarcador = this.horario;
    this.listHorarios.push(objMarcador);
    localStorage.setItem("horarios",JSON.stringify(this.listHorarios));

    console.log(this.listHorarios);
  }

}
