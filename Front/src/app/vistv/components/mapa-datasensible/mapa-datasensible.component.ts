import { Component, OnInit } from '@angular/core';
import { Marcador } from './../../models/Marcador';

@Component({
  selector: 'app-mapa-datasensible',
  templateUrl: './mapa-datasensible.component.html',
  styleUrls: ['./mapa-datasensible.component.scss']
})
export class MapaDatasensibleComponent implements OnInit {

  // title: string = 'My first AGM project';
  lat: number = -16.4142104;
  lng: number = -71.5398665;

  objMarcador:Marcador;


  constructor() { 
    // this.objMarcador = data.marcador;
  }

  ngOnInit() {
    // console.log(this.objMarcador);
    
  }

  agregarMarcador(evento){
    let objMarcador = new Marcador(evento.coords.lat,evento.coords.lng);
    
    localStorage.setItem("marcadores",JSON.stringify(objMarcador));

  }

}
