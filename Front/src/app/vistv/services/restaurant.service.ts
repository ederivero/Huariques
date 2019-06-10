import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private _http:HttpClient) { 
    this.getRestaurant();

  }

  getRestaurant(){
    // CON OBSERVABLES
    return this._http.get('http://localhost:3000/api/');
    // CON PROMESAS
    // return fetch('http://localhost:3000/api/playa');    
  }
}
