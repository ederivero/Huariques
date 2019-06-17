import { Component, OnInit } from '@angular/core';
import { AuthServiceLocal } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  title: string = 'Descubre nuevos lugares para comer!';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  constructor(private _sAuth:AuthServiceLocal) { }

  ngOnInit() {
  }

}
