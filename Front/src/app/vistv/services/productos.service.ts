import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _http:HttpClient) {
    this.getProductos();

  }

  getProductos(){
    // CON OBSERVABLES
    return this._http.get('http://localhost:3000/api/producto/traertodos');
    // CON PROMESAS
    // return fetch('http://localhost:3000/api/playa');    
  }



}
