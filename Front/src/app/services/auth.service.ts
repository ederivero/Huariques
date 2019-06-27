import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceLocal {

  user = new Subject<string>();
  logged: boolean = false;
  token: string;

  constructor(private _http: HttpClient,
              private _router: Router,
              private _sAuthService: AuthService
              ) {
    this.getToken();
  }
  
  userLogged(): Observable<string> {
    return this.user.asObservable();
  }
  updateUserLogged(userLogged:string) {
    this.user.next(userLogged);
  }
  isLogged() {
    let userDetails = this.getUserDetails();
    if (userDetails) {
      let ahora = Date.now() / 1000;
      if (userDetails.exp > ahora) {
        return this.logged = true;
      }else{
        this.cerrarSesion();
        return this.logged = false;
      }
    }else{
      this.cerrarSesion();

      return this.logged = false;
    }
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
  userCreate(objUsuario): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post('https://huariquesback.herokuapp.com/api/usuario/crear', objUsuario, { headers: headers });
  }
  saveToken(token) {
    localStorage.setItem('token', token);
    this.token = token;
  }
  getUserLogged(email: string): Observable<any> {
    return this._http.get(`https://huariquesback.herokuapp.com/api//usuario/traerporcorreo/${email}`);
  }
  getUserDetails() {
    if (this.token) {
      let centro = this.token.split('.')[1];
      let user = JSON.parse(window.atob(centro));
      return user;
    } return null;
  }
  logout() {
    this.token = null;
    this.updateUserLogged("false");
    localStorage.removeItem("token");
    this._router.navigateByUrl('');
  }
  cerrarSesion() {
    this._sAuthService.signOut().then(() => {
      this.logout();
    }).catch(() => {
      this.logout();
    });
  }

}