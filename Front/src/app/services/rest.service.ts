import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private _http: HttpClient) { }
  
  getRest(){
    return this._http.get('https://huariquesback.herokuapp.com/api/restaurante/traertodos');
  }
  buscarpopalabra(palabra){
    return this._http.get(`https://huariquesback.herokuapp.com/api/restaurante/encontrar/${palabra}`);
  }
}
