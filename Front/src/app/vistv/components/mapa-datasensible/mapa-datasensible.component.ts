import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mapa-datasensible',
  templateUrl: './mapa-datasensible.component.html',
  styleUrls: ['./mapa-datasensible.component.scss']
})
export class MapaDatasensibleComponent implements OnInit {

  title: string = 'My first AGM project';
  lat: number = -16.4142104;
  lng: number = -71.5398665;

  constructor() { }

  ngOnInit() {
  }

}
