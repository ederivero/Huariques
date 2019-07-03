import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { AuthServiceLocal } from './../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { InicioService } from 'src/app/services/inicio.service';
export interface DialogData {
  animal: string;
  name: string;
}
export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  inicio: boolean = false;
  animal: string;
  name: string;
  stateForm: FormGroup = this._formBuilder.group({
    stateGroup: '',
  });

  stateGroups: StateGroup[] = [{
    letter: 'A',
    names: ['Anticucho']
  }, {
    letter: 'B',
    names: ['Broaster']
  }, {
    letter: 'C',
    names: ['Caparinas', 'Ceviche', 'Chifa']
  }, {
    letter: 'P',
    names: ['Pizzas', 'Pollo a la Brasa']
  }, {
    letter: 'S',
    names: ['Salchipapa']
  }, {
    letter: 'T',
    names: ['Tacos']
  }];

  stateGroupOptions: Observable<StateGroup[]>;
  userRest=false;
  user = false;
  p;
  busqueda: string;

  constructor(public dialog: MatDialog,
    private _sAuth: AuthServiceLocal,
    private _formBuilder: FormBuilder,
    private _Router: Router,private ruta:ActivatedRoute,private _Sinicio:InicioService) {
    // console.log(window.location.href);
    // console.log(window.location.href.split('/')[3])
    if (window.location.href.split('/')[3] === "" || window.location.href.split('/')[3] === "#") {
      this.inicio = true
    } else {
      this.inicio = false
    }
    if (localStorage.getItem('token')) {
      this.user = null;
      this._sAuth.getUserLogged(this._sAuth.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        this.p = res.content[0];
        console.log(this.user[0])
        if (this.user[0].usu_tipo === "0") {
          // this._Router.navigateByUrl(`gest/${this.user[0].usu_id}`)
          this.userRest=true
        }
      })
    } else {
      this._sAuth.userLogged().subscribe((resp: any) => {
        this.user = null;
        if (resp == "false") {
          this.user = false;
        } else {
          this._sAuth.getUserLogged(resp).subscribe((res: any) => {
            this.user = res.content;
            this.p = res.content[0];
          })
        }
      })
    }

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (localStorage.getItem('token')) {
        this.user = null;
        this._sAuth.getUserLogged(this._sAuth.getUserDetails().usu_id).subscribe((res: any) => {
          this.user = res.content;
          this.p = res.content[0];
          console.log(this.user[0].usu_id)
          if (this.user[0].usu_tipo === "0") {
            this._Router.navigateByUrl(`gest/${this.user[0].usu_id}`)
          }
        })
      }else {
        this._sAuth.userLogged().subscribe((resp: any) => {
          this.user = null;
          if (resp == "false") {
            this.user = false;
          } else {
            this._sAuth.getUserLogged(resp).subscribe((res: any) => {
              this.user = res.content;
              this.p = res.content[0];
            })
          }
        })
      }
    });
  }
  ngOnInit() {
    this.ruta.params.subscribe((params)=>{
      this.inicio=this._Sinicio.getiniciovar()
      console.log(params)
      if (window.location.href.split('/')[3] === "" || window.location.href.split('/')[3] === "#") {
        this.inicio = true
      } else {
        this.inicio = false
      }
    })
    this.stateGroupOptions = this.stateForm.get('stateGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
  }
  private _filterGroup(value: string): StateGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({ letter: group.letter, names: _filter(group.names, value) }))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }
  resetInicio(){
    // this.inicio=true
  }
  gestRest(){
    this._Router.navigateByUrl(`gest/${this.user[0].usu_id}`)
    // this.inicio=false
  }
  onKey(event) {
    this.busqueda = event.target.value;
  }
  Buscar($event) {
    $event.preventDefault()
    if (this.busqueda === ""||this.busqueda === undefined) {
      this._Router.navigate([`busqueda/todos`]);
    } else {
      this._Router.navigate([`busqueda/${this.busqueda}`]);
    }
  }
  logOut() {
    this._sAuth.cerrarSesion();
    this._Router.navigateByUrl(``)
  }

}
