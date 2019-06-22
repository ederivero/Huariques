import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { BusquedaService } from 'src/app/services/busqueda.service';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {


  inicio = true
  @Output() variableInicioEnvio = new EventEmitter<boolean>();

  title: string = 'Descubre nuevos lugares para comer!';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  num = 0;
  busqueda: string
  onKey(event) {
    this.busqueda = event.target.value;
  }

  constructor(private _BusquedaService:BusquedaService) {
    this.contador()
  }
  contadorfinalizado(){
    console.log("se paro el contador")
  }

  status: boolean = true;
  abrirBusqueda() {
    this.status = !this.status;
  }
  Buscar($event) {
    $event.preventDefault()
    if (this.busqueda === ""||this.busqueda === undefined) {
      fetch(`https://huariquesback.herokuapp.com/api/restaurante/traertodos`)
        .then(response => {
          return response.json()
        }).then(data => {
          // console.log(data)
          this.buscar(data);
        })
    } else {
      fetch(`https://huariquesback.herokuapp.com/api/restaurante/encontrar/${this.busqueda}`)
      .then(response => {
        return response.json()
      }).then(data => {
        // console.log(data)
        this.buscar(data);
      })
    }
  }
  buscar(datos) {
    this._BusquedaService.setArray(datos);
  }
  contador() {
    for (let i = 0; i < 100; i++) {
      setTimeout(() => { this.num++ }, 1000)
    }
  }
  ngOnInit() {
  }

}
