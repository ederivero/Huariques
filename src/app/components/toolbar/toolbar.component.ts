import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './../login/login.component';
import { AuthServiceLocal } from './../../services/auth.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

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
  constructor(
    private dialog: MatDialog,
    private _sAuth: AuthServiceLocal,
    private _formBuilder: FormBuilder
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

  openDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '30%',
    });
  }

}
