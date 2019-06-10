import { Component, OnInit } from '@angular/core';
import { CalificanosComponent } from '../calificanos/calificanos.component';
import { MatDialog } from '@angular/material/dialog';
import { asapScheduler } from 'rxjs';


@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],
  
})
export class RestDetailsComponent implements OnInit {


  horariofinActual="";
  feriadors:Boolean=true;
  estado: Boolean = true;
  title: string = 'Anticucheria la ultima cena';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  dias:Array<String>=["Lun","Mar","Mier","Jue","Vier","Sab","Dom"]
  horarios:Array<any>=[{
    rest_dAtencion:"Lunes",
    rest_hApertura:"18:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Martes",
    rest_hApertura:"18:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Miercoles",
    rest_hApertura:"18:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Jueves",
    rest_hApertura:"18:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Viernes",
    rest_hApertura:"16:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Sabado",
    rest_hApertura:"13:00",
    rest_hCierre:"22:00"
  },
  {
    rest_dAtencion:"Domingo",
    rest_hApertura:"13:00",
    rest_hCierre:"22:00"
  }]
  comentarios:Array<any>=[{
    id:1,
    nombre:"Joel",
    comentario:"Recomendado",
    rating:5
  },
  {
    id:2,
    nombre:"Juan Perez",
    comentario:"Hace unos buenos anticuchos",
    rating:4.5
  },
  {
    id:3,
    nombre:"Maria la del barrio",
    comentario:"No me fue muy bien, aunque igual estaban ricos los anticuchos",
    rating:1.5
  }]
  
  constructor(public dialog:MatDialog) {
    this.obtenerDiaActual()
    fetch('https://huariquesback.herokuapp.com/api/restaurante/traertodos').then((response)=>{
      return response.json()
    }).then((data)=>{
      console.log(data.content[40])
      this.title=data.content[40].rest_rSocial;
      this.lat=+data.content[40].rest_lat;
      this.lng=+data.content[40].rest_lng;
      this.horarios=[]
      console.log(data.content[40].rest_dAtencion.split(','))
      data.content[40].rest_dAtencion.split(',').forEach(dia => {
        this.horarios.push({
          rest_dAtencion:dia,
          rest_hApertura:data.content[40].rest_hApertura,
          rest_hCierre:data.content[40].rest_hCierre
        });
      });
      this.obtenerDiaActual()
    })
  }

  ngOnInit() {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CalificanosComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }
  obtenerDiaActual(){
    var diaActualN= new Date();
    let diaDeSemanaActual = this.dias[diaActualN.getDay()-1]
    let horaActual = diaActualN.getHours()
    // console.log(horaActual)
    console.log(diaDeSemanaActual)
    this.horarios.forEach(horario => {
      if (diaDeSemanaActual==horario.rest_dAtencion) {
        this.horariofinActual=horario.rest_hCierre
      }
    });
  }

}
