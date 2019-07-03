import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  inicio: boolean=true;

  constructor() { }
  setinicioVar(inicio){
    this.inicio=inicio
  }
  getiniciovar(){
    return this.inicio
  }
}
