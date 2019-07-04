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
  selector: 'app-loginRegistro',
  templateUrl: './loginRegistro.component.html',
  styleUrls: ['./loginRegistro.component.scss']
})
export class LoginRegistroComponent implements OnInit {

  click: boolean = false;
  usu_passConfirm: '';
  imagen: any[];

  objUsuario = {
    usu_nom: '',
    usu_ape: '',
    usu_email: '',
    usu_pass: '',
    usu_tel: '',
    usu_tipo: '1'
  }
  telefonoFormControl = new FormControl('', [
    
  ]);
  nombreFormControl = new FormControl('', [
    Validators.required,
  ]);
  apellidoFormControl = new FormControl('', [
    Validators.required,
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required
  ]);
  confirmpasswordFormControl = new FormControl('', [
    Validators.required
  ]);


  localLogin: Subscription;

  ngOnInit() {
  }

  constructor(private dialogRef: MatDialogRef<LoginRegistroComponent>,
    private _sAuth: AuthServiceLocal,
    public snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
    this.localLogin.unsubscribe();
  }

  onFileChange(event) {
    this.imagen = event.target.files;
    // console.log(this.imagen);
  }

  enviarRegistro() {


    if (this.objUsuario.usu_pass === this.usu_passConfirm) {
      if ((this.objUsuario.usu_nom != '' && this.objUsuario.usu_ape != '') &&
        (this.objUsuario.usu_email != '') && this.click == false) {
        var formData = new FormData();
        if (this.imagen == undefined) {
          formData.append('usu_img', "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/usuarios%2Fdefault-forum-user.png?alt=media&token=229b408f-57dd-4e5c-98b0-a4704fda1063")
        } else {
          formData.append('imagen',
            this.imagen[0],
            this.imagen[0].name);
        }
        formData.append('usu_nom', this.objUsuario.usu_nom)
        formData.append('usu_ape', this.objUsuario.usu_ape)
        formData.append('usu_email', this.objUsuario.usu_email)
        formData.append('usu_pass', this.objUsuario.usu_pass)
        formData.append('usu_tipo', this.objUsuario.usu_tipo)
        formData.append('usu_tel', this.objUsuario.usu_tel)
        let headersRest = {
          method: 'POST',
          body: formData
        };
        this.click = true;
        fetch('https://huariquesback.herokuapp.com/api/usuario/crear', headersRest)
          .then(response => {
            // console.log(response)
            return response.json();
          }).then(respuesta => {
            // console.log(respuesta);
            if (respuesta.message == "created" && respuesta.token) {
              this._sAuth.updateUserLogged(this.objUsuario.usu_email)
              this._sAuth.saveToken(respuesta.token);
              this.dialogRef.close();
              let user = this._sAuth.getUserDetails();
              this.snackBar.open(`Bienvenido ${user.usu_nom}`, "OK", {
                duration: 5000,
                horizontalPosition: 'right'
              });

            } else if (respuesta.message == "error") {
              this.click = false;
              this.objUsuario.usu_pass = '';
              this.usu_passConfirm = '';
              this.snackBar.open(`No se completo el registro, intentelo nuevamente`, "OK", {
                duration: 5000,
                verticalPosition: 'top'
              });
            }
          })
      }

    } else {
      this.click = false;
      this.objUsuario.usu_pass = '';
      this.usu_passConfirm = '';
      this.snackBar.open(`La contrasenas no coinciden`, "OK", {
        duration: 5000,
        verticalPosition: 'top'
      });
    }
  }


}
