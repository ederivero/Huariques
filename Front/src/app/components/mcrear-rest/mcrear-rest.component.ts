import { Component, OnInit } from '@angular/core';
import { Marcador } from './../../vistv/models/Marcador';

import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-mcrear-rest',
  templateUrl: './mcrear-rest.component.html',
  styleUrls: ['./mcrear-rest.component.scss']
})
export class McrearRestComponent implements OnInit {

  objMarcador = []

  lat: number = -16.4142104;
  lng: number = -71.5398665;
  srcResult: any;

  markers = [
      { 
        latitude: 52.228973, 
        longitude: 20.728218 
      }
  ];
  latR: number;
  lngR: number;
  nMarkers=[];
  rMarkers= [];
  cadauno = [];
  // nMark=[{
  //   latitude: '',
  //   longitude: ''
  // }]
  nMark:string;
  
  // checked = true;
n_rSocial = 'yu';

  objNRest = {
    n_rSocial:'',
    n_rDir:'',
    n_rRefDir:'',
    n_rTel:0,
    n_rLat: 0,
    n_rLng: 0,
    n_rInfo:'',
    n_rImg:'',
    n_rRefUbic:'',
    n_rDAt:'',
    n_rHAp:'',
    n_rHCer:''
  }
  inputValue: any;

 chL= false;
 chM=true;

 opcion1
 opcion2

 isChecked : boolean;
 checked=true;

  constructor() { }

  ngOnInit() {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        console.log(this.srcResult);
        
      };
  
      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }


  posicionMarcador(posicion: any) {
    const lat = posicion.coords.lat;
    const lng = posicion.coords.lng;
    

    this.markers.push({ latitude: lat, longitude: lng });
    this.markers.splice(0, 1); 
    
    
  }; 

  onKey(event) {
    this.inputValue = event.target.value;
    this.objNRest.n_rLat = this.inputValue;
    console.log(this.objNRest.n_rLat);
    
  }

  crearRest(){
    console.log(this.objNRest);

    // console.log(this.chM);
    console.log(this.checked);
    

    
    // <input type="checkbox" name="checkbox" [(ngModel)]="isChecked">

    
  }

}
