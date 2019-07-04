import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

  public arrayDelService: Array<any>;

  buscartodos(){
    return this._http.get('https://huariquesback.herokuapp.com/api/restaurante/traertodos');
  }
  

  setArray(array: any) {
    this.arrayDelService = array;
  }

  getArray() {
    return this.arrayDelService;
  }
  
  constructor(private _http: HttpClient) { }
}
