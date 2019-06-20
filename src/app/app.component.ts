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
