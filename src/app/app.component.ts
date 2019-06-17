import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { AuthServiceLocal } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {


  logged;
  nombre;

  constructor(public dialog: MatDialog,
              private _sAuth: AuthServiceLocal) {
    if(localStorage.getItem('token')){
      this.logged=true;
      let usu= this._sAuth.user;
      console.log(usu);
      
    }
    this._sAuth.getLogged().subscribe((resp:boolean)=>{
      this.logged=resp;      
    })
  }
  ngOnInit() {
    if(this.logged){
      let user = this._sAuth.getUserDetails();
      this.nombre = user.usu_nom;
      console.log(this.nombre);
      
    }
          
  }
  logOut(){
    this._sAuth.cerrarSesion();
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '30%',
    });
  }

}
