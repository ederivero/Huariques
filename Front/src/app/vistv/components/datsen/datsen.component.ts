import { Component, OnInit , ViewChild} from '@angular/core';
import {MapaDatasensibleComponent} from '../mapa-datasensible/mapa-datasensible.component';
import { Marcador } from './../../models/Marcador';


@Component({
  selector: 'app-datsen',
  templateUrl: './datsen.component.html',
  styleUrls: ['./datsen.component.scss']
})
export class DatsenComponent implements OnInit {

  constructor() { }

  objMarcadorDat:Marcador;

  ngOnInit() {
  }

}
