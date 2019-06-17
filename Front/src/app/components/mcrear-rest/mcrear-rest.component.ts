import { Component, OnInit } from '@angular/core';
import { Marcador } from './../../vistv/models/Marcador';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-mcrear-rest',
  templateUrl: './mcrear-rest.component.html',
  styleUrls: ['./mcrear-rest.component.scss']
})
export class McrearRestComponent implements OnInit {

  objMarcador:Marcador;

  lat: number = -16.4142104;
  lng: number = -71.5398665;
  srcResult: any;

   
  
  // checked = true;

  constructor() { }

  ngOnInit() {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  agregarMarcadorCre(evento){
    let objMarcador = new Marcador(evento.coords.lat,evento.coords.lng);    
    // localStorage.setItem("marcadores",JSON.stringify(objMarcador));
    
    // this.lat= +this.objMarcador.lat;
    // this.lng= +this.objMarcador.lng;
    
    // console.log(this.lat);
    // console.log(this.lng);
    console.log(objMarcador);
    
    
  }

}
