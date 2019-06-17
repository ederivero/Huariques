import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceLocal {

  loggedIn = new Subject<boolean>();
  user={};

  getLogged(): Observable<boolean>{
    return this.loggedIn.asObservable();
 }
 updateLogged(loggedin: boolean) {
  this.loggedIn.next(loggedin);
}




  logged:boolean=false;
  private token: string;

  constructor(private _http: HttpClient,
              private _router:Router,
              private _sAuthService:AuthService) {
    this.getToken();
    this.updateUserLogged();
    
  }
  isLogged(){
    
    let userDetails = this.getUserDetails();
    if (userDetails) {
      let ahora = Date.now() / 1000;
      if (userDetails.exp > ahora) {
        console.log(userDetails.exp);
        
       return this.logged=true;
      }
      localStorage.removeItem('token');
      return this.logged=false;
    } 
    return this.logged=false;
  }
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
  }
  login(objUsuario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('https://huariquesback.herokuapp.com/api/usuario/login', objUsuario, { headers: headers });
    
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    this.token = token;
  }
  updateUserLogged(){
    if(this.isLogged()){
      console.log(this.getUserDetails().usu_email);      
      this._http.get(`https://huariquesback.herokuapp.com/api//usuario/traerporcorreo/${this.getUserDetails().usu_email}`)
      .subscribe((resp:any)=>{
        this.user = resp;
        console.log(this.user);
        
      });
      
    }
  }

  getUserDetails() {
    if (this.token) {
      let centro = this.token.split('.')[1];
      let user = JSON.parse(window.atob(centro));
      return user;
    } return null;
  }
  logout(){
    this.token=null;
    localStorage.removeItem("token");
    this.updateLogged(false)
    this._router.navigateByUrl('');

  }
  // getRest(){
  //   return this._http.get('https://huariquesback.herokuapp.com/api/restaurante/traertodos');
  // }
  cerrarSesion(){
    this._sAuthService.signOut().then(()=>{
      this.logout();
    }).catch(()=>{
      this.logout();
    });
  }

}