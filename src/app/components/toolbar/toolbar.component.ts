import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { AuthServiceLocal } from './../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  
  user = false;
  p;
  constructor(
    private dialog: MatDialog,
    private _sAuth: AuthServiceLocal
  ) {
    if (localStorage.getItem('token')) {
      this.user = null;
      this._sAuth.getUserLogged(this._sAuth.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        this.p = res.content[0];
      })

    } else {
      this._sAuth.userLogged().subscribe((resp: any) => {
        this.user = null;
        this._sAuth.getUserLogged(resp).subscribe((res: any) => {
          this.user = res.content;
          this.p = res.content[0];
        })
      })
    }

  }
  ngOnInit() {
  }

  logOut() {
    this.user = false;
    this._sAuth.cerrarSesion();
  }

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '30%',
    });
  }

}
