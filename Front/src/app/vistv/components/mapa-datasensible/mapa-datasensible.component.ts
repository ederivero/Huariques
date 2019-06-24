import { Component, OnInit, Input } from '@angular/core';
import { Marcador } from './../../models/Marcador';
import { FormControl, FormGroup, Validators } from '@angular/forms';


// import {DatsenComponent} from '../datsen/datsen.component';

@Component({
  selector: 'app-mapa-datasensible',
  templateUrl: './mapa-datasensible.component.html',
  styleUrls: ['./mapa-datasensible.component.scss']
})
export class MapaDatasensibleComponent implements OnInit {

  objMarcador: Marcador;

  latitud;
  longitud;




  // @ViewChild("") dataSen:DatsenComponent

  title: string = 'My first AGM project';
  lat: number = -16.4142104;
  lng: number = -71.5398665;

  espacio = 10;

  icon = {
    url: '../../../img/tacaspastor.jpg',
    scaledSize: { height: 40, width: 40 }
  }

  markers = [
    {
      latitude: 52.228973,
      longitude: 20.728218
    }
  ];

  constructor() {
    // this.objMarcador = data.marcador;
    if (localStorage.getItem('horarios')) {
      this.objMarcador = JSON.parse(localStorage.getItem('horarios'));
    }



  }

  ngOnInit() {
    // console.log(this.objMarcador);

  }

  posicionMarcador(posicion: any) {
    const lat = posicion.coords.lat;
    const lng = posicion.coords.lng;


    this.markers.push({ latitude: lat, longitude: lng });
    this.markers.splice(0, 1);


  };

  agregarMarcador(evento) {
    let objMarcador = new Marcador(evento.coords.lat, evento.coords.lng);
    localStorage.setItem("marcadores", JSON.stringify(objMarcador));

    this.latitud = +this.objMarcador.lat;
    this.longitud = +this.objMarcador.lng;

  }

}
