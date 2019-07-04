import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio-bu',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  title: string = 'Descubre nuevos lugares para comer!';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  inicio
  constructor() {
    this.inicio=true
  }

  ngOnInit() {
  }

}
