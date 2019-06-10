import { Component, OnInit, Input } from '@angular/core';
import { Marcador } from './../../models/Marcador';
// import {DatsenComponent} from '../datsen/datsen.component';

@Component({
  selector: 'app-mapa-datasensible',
  templateUrl: './mapa-datasensible.component.html',
  styleUrls: ['./mapa-datasensible.component.scss']
})
export class MapaDatasensibleComponent implements OnInit {

  objMarcador:Marcador;

  latitud;
  longitud;

  // @ViewChild("") dataSen:DatsenComponent

  // title: string = 'My first AGM project';
  lat: number = -16.4142104;
  lng: number = -71.5398665;



  icon = { 
          url: '../../../img/tacaspastor.jpg', 
          scaledSize: {height: 40, width: 40}}

  constructor() { 
    // this.objMarcador = data.marcador;
    if(localStorage.getItem('horarios')){
      this.objMarcador = JSON.parse(localStorage.getItem('horarios'));    
    }



  }

  ngOnInit() {
    // console.log(this.objMarcador);
    
  }

  agregarMarcador(evento){
    let objMarcador = new Marcador(evento.coords.lat,evento.coords.lng);    
    localStorage.setItem("marcadores",JSON.stringify(objMarcador));


    
    this.latitud= this.objMarcador.lat;
    this.longitud= this.objMarcador.lng;
    
  }

}
