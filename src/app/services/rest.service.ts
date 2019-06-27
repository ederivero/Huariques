import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  busquedaRest = new Subject<string>();
  constructor(private _http: HttpClient) { }
  
  getRest(){
    return this._http.get('https://huariquesback.herokuapp.com/api/restaurante/traertodos');
  }
}
