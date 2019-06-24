
import {ClickEvent} from 'angular-star-rating';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calificanos',
  templateUrl: './calificanos.component.html',
  styleUrls: ['./calificanos.component.scss']
})
export class CalificanosComponent implements OnInit {
  TOTAL:Number;
  Comentario: String;
  onClickResult: ClickEvent;
  onClickResult2: ClickEvent;
  onClickResult3: ClickEvent;
  onClick1 = ($calidad: ClickEvent) => {
    this.onClickResult = $calidad;
    // console.log('onClick $calidad: ', $calidad.rating);
    // console.log('onclick result ', this.onClickResult.rating);
  };
  onClick2 = ($cantidad: ClickEvent) => {
    this.onClickResult2 = $cantidad;
    // console.log('onclick result 2: ', this.onClickResult2.rating);
  };
  onClick3 = ($limpieza: ClickEvent) => {
    this.onClickResult3 = $limpieza;
    // console.log('onClick $limpieza: ', $limpieza.rating);
  };
  onKey(event) {
    this.Comentario = event.target.value;
  }
  Puntuacion(){
    this.TOTAL;
    // console.log( this.onClickResult.rating)
    this.TOTAL=(this.onClickResult.rating+this.onClickResult2.rating+this.onClickResult3.rating)/3;
    // console.log( this.TOTAL);
    let obj = {
      punt_cali:this.onClickResult.rating,
      punt_cant:this.onClickResult2.rating,
      punt_limp:this.onClickResult3.rating,
      punt_total:this.TOTAL,
      punt_coment:this.Comentario,
      regCliente_id:1,
    }
    let headers ={
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(obj)
    };
    fetch('https://huariquesback.herokuapp.com/api/puntuacion/crear',headers).then(Response=>{
    console.log(Response)  
    return Response.json()})
    .then(data=>{
      console.log(data);
      this.dialogRef.close();
    })
    console.log(obj);
  }

  constructor(public dialogRef: MatDialogRef<CalificanosComponent>) { }
  
  
  
  
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
