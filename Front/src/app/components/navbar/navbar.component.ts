import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
import { AuthServiceLocal } from './../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
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
  inicio:boolean=false;
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

  user = false;
  p;

  constructor(public dialog: MatDialog,
    private _sAuth: AuthServiceLocal,
    private _formBuilder: FormBuilder) {
    // console.log(window.location.href);
    // console.log(window.location.href.split('/')[3])
    if(window.location.href.split('/')[3]===""){
      this.inicio=true
    }else{
      this.inicio=false
    }
    if (localStorage.getItem('token')) {
      this.user = null;
      this._sAuth.getUserLogged(this._sAuth.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        this.p = res.content[0];
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
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ngOnInit() {
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

  logOut() {
    this._sAuth.cerrarSesion();
  }

}
