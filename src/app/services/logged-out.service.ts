import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServiceLocal } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedOutService implements CanActivate {
  logged
  constructor(private _Router: Router,
    private _sAuth: AuthServiceLocal) {
     
     }

  canActivate() {
    if (!this._sAuth.isLogged()) {
      return true;
    }
    else {
      this._Router.navigateByUrl("table");
      return false;
    }
  }
}
