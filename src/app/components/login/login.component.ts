import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";


import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  objUsuario = {
    usu_email: '',
    usu_pass: ''
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      if (user) {
        console.log(user);
        this.dialogRef.close();
        this.snackBar.open(`Bienvenido ${user.name}`, "OK", {
          duration: 5000,
          horizontalPosition: 'right'
        });
        this._router.navigateByUrl('/table');

      }
    });
  }
  ngOnDestroy() {
  }

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private _sAuth: AuthServiceLocal,
              private _router: Router,
              public snackBar: MatSnackBar,
              private authService: AuthService) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  login() {
    this._sAuth.login(this.objUsuario).subscribe((respuesta) => {
      if (respuesta.message == "ok" && respuesta.token) {
        this._sAuth.saveToken(respuesta.token);
        this._sAuth.updateLogged(true)
        this.dialogRef.close();
        let user = this._sAuth.getUserDetails();
        this.snackBar.open(`Bienvenido ${user.usu_nom}`, "OK", {
          duration: 5000,
          horizontalPosition: 'right'
        });
        
        this._router.navigateByUrl("/table");
        this._sAuth.updateUserLogged();
      } else {
        this.snackBar.open(`Usuario o contraseña incorrecta`, "OK", {
          duration: 5000,
          verticalPosition: 'top'
        });
      }
    });
  }


}
