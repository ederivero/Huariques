import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { FormControl, Validators } from '@angular/forms';


import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild("myButton", { static: false }) myButton: ElementRef;

  objUsuario = {
    usu_email: '',
    usu_pass: ''
  }
  objUsuarioSocial = {
    usu_email: '',
    usu_pass: ''
  }
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  socialLogin: Subscription;
  localLogin: Subscription;

  ngOnInit() {
  }
  ngOnDestroy() {
    this.socialLogin.unsubscribe();
  }

  constructor(private dialogRef: MatDialogRef<LoginComponent>,
    private _sAuth: AuthServiceLocal,
    private _router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService) { }

  signInWithGoogle(): void {

    this.socialLogin = this.authService.authState.subscribe((user) => {

      if (user == null || user.provider != 'GOOGLE') {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
      } else if (user.provider == 'GOOGLE') {
        this.objUsuarioSocial.usu_email = user.email;
        this.objUsuarioSocial.usu_pass = "huariques";
        this.dialogRef.close();
        this.localLogin = this._sAuth.login(this.objUsuarioSocial).subscribe((respuesta) => {
          if (respuesta.message == "ok" && respuesta.token) {
            this._sAuth.saveToken(respuesta.token);
            this._sAuth.updateUserLogged(this.objUsuarioSocial.usu_email);
            this.snackBar.open(`Bienvenido ${user.firstName}`, "OK", {
              duration: 5000,
              horizontalPosition: 'right'
            });
            this._router.navigateByUrl("/table");
          } else if (respuesta.message === 'error') {
            console.log("Usuario no resgistrado");
            let usu = {
              usu_email: user.email,
              usu_nom: user.firstName,
              usu_ape: user.lastName,
              usu_tipo: '1',
              usu_img: user.photoUrl,
              usu_pass: 'huariques'
            }
            this._sAuth.userCreate(usu).subscribe(respuesta2 => {
              console.log(respuesta2);

              if (respuesta2.message = 'created' && respuesta2.token) {
                this._sAuth.saveToken(respuesta2.token);
                this._sAuth.updateUserLogged(this.objUsuarioSocial.usu_email);
                this.snackBar.open(`Bienvenido ${user.firstName}`, "OK", {
                  duration: 5000,
                  horizontalPosition: 'right'
                });
                this._router.navigateByUrl("/table");
              } else if (respuesta2.message = 'created') {
                console.log("Error al crear usuario prro");

              }
            })


          }
        });

      }

    })

  }

  signInWithFB(): void {
    this.socialLogin = this.authService.authState.subscribe((user) => {

      if (user == null || user.provider != 'FACEBOOK') {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      } else if (user.provider == 'FACEBOOK') {
        this.objUsuarioSocial.usu_email = user.email;
        this.objUsuarioSocial.usu_pass = "huariques";
        this.dialogRef.close();
        this.localLogin = this._sAuth.login(this.objUsuarioSocial).subscribe((respuesta) => {
          if (respuesta.message == "ok" && respuesta.token) {
            this._sAuth.saveToken(respuesta.token);
            this._sAuth.updateUserLogged(this.objUsuarioSocial.usu_email);
            this.snackBar.open(`Bienvenido ${user.firstName}`, "OK", {
              duration: 5000,
              horizontalPosition: 'right'
            });
            this._router.navigateByUrl("/table");
          } else if (respuesta.message === 'error') {
            console.log("Usuario no resgistrado");
            let usu = {
              usu_email: user.email,
              usu_nom: user.firstName,
              usu_ape: user.lastName,
              usu_tipo: '1',
              usu_img: user.photoUrl,
              usu_pass: 'huariques'
            }
            this._sAuth.userCreate(usu).subscribe(respuesta2 => {
              console.log(respuesta2);

              if (respuesta2.message = 'created' && respuesta2.token) {
                this._sAuth.saveToken(respuesta2.token);
                this._sAuth.updateUserLogged(this.objUsuarioSocial.usu_email);
                this.snackBar.open(`Bienvenido ${user.firstName}`, "OK", {
                  duration: 5000,
                  horizontalPosition: 'right'
                });
                this._router.navigateByUrl("/table");
              } else if (respuesta2.message = 'created') {
                console.log("Error al crear usuario prro");

              }
            })


          }
        });

      }

    })
  }

  onNoClick(): void {
    this.socialLogin.unsubscribe();
    this.localLogin.unsubscribe();
    this.dialogRef.close();
  }

  login() {
    if (this.objUsuario.usu_email != '' && this.objUsuario.usu_pass != '') {
      this.localLogin = this._sAuth.login(this.objUsuario).subscribe((respuesta) => {
        if (respuesta.message == "ok" && respuesta.token) {
          this._sAuth.saveToken(respuesta.token);
          this._sAuth.updateUserLogged(this.objUsuario.usu_email)
          this.dialogRef.close();
          let user = this._sAuth.getUserDetails();
          this.snackBar.open(`Bienvenido ${user.usu_nom}`, "OK", {
            duration: 5000,
            horizontalPosition: 'right'
          });

          this._router.navigateByUrl("/table");
        } else if (respuesta.message == "error") {
          console.log(respuesta);

          this.objUsuario.usu_pass = '';
          this.snackBar.open(`Usuario o contraseña incorrecta`, "OK", {
            duration: 5000,
            verticalPosition: 'top'
          });
        }
      });
    }
  }


}
