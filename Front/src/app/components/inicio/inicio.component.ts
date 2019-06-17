import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})

export class InicioComponent implements OnInit {
  
  
  inicio=true
  @Output() variableInicioEnvio = new EventEmitter<boolean>();

  enviarMensaje(){
    this.variableInicioEnvio.emit(this.inicio);
  }
  
  title: string = 'Descubre nuevos lugares para comer!';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  num = 0;
  
  constructor() {
    this.contador()
    this.enviarMensaje()
  }

  status: boolean = true;
  abrirBusqueda() {
    this.status = !this.status;
  }
  contador() {
    for (let i = 0; i < 100; i++) {
      setTimeout(()=>{this.num++},1000)
    }
  }
  ngOnInit() {
  }

}
