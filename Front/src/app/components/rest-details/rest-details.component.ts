import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],
  
})
export class RestDetailsComponent implements OnInit {

  feriadors:Boolean=true;
  estado: Boolean = true;
  horarioFin: string = "22:00"
  horarioInicio:string="12:00"
  title: string = 'Anticucheria la ultima cena';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  horarios:Array<String>=["lunes","martes","miercoles","Jueves","Viernes","Sabado","Domingo"]  
  objComentario:any={
    id:0,
    nombre:"Joel",
    comentario:"Muy buen restaurante",
    rating:3
  }
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
    comentario:"No me fue muy bien",
    rating:1.5
  }]
  constructor() {}

  ngOnInit() {
  }

}
