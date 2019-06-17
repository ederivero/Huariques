import { Component, } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  iniciomsj: boolean;

  mensajeParaGoten(inicio: boolean){
    this.iniciomsj = inicio;
  }

  constructor(){
  }
  
}
