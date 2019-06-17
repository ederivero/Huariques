import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  objRestaurante = {
    sol_rSocial: '',
    sol_direccion: '',
    sol_lat: 0.0,
    sol_lng: 0.0,
    sol_email: '',
    sol_tipo: 0,
    sol_desc: '', // extras
    sol_fono: '',
    sol_dAtencion: ''
  };
  secondFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) {
    this.ubicacion();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      tipo: 0
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: '',
      desc: '',
      Lun: false,
      Mar: false,
      Mie: false,
      Jue: false,
      Vie: false,
      Sab: false,
      Dom: false
    });
  }

  ubicacion() {
    if (navigator.geolocation) {
      // obtener la ubicacion actual
      navigator.geolocation.getCurrentPosition((pos: any) => {

        this.objRestaurante.sol_lat = parseFloat(pos.coords.latitude);
        this.objRestaurante.sol_lng = parseFloat(pos.coords.longitude);

      }, err => {
        console.log(err.message);
      })
    } else {
      console.log('No disponemos de geolocalizacion');
    }
  }

  enviar() {
    console.log(this.secondFormGroup.value);
    this.objRestaurante.sol_dAtencion = '';
    this.objRestaurante.sol_desc = '';
    this.objRestaurante.sol_desc = this.secondFormGroup.value.desc;
    if (this.secondFormGroup.value.Lun) {
      this.objRestaurante.sol_dAtencion += 'Lun,';
    }
    if (this.secondFormGroup.value.Mar) {
      this.objRestaurante.sol_dAtencion += 'Mar,';
    }
    if (this.secondFormGroup.value.Mie) {
      this.objRestaurante.sol_dAtencion += 'Mie,';
    }
    if (this.secondFormGroup.value.Jue) {
      this.objRestaurante.sol_dAtencion += 'Jue,';
    }
    if (this.secondFormGroup.value.Vie) {
      this.objRestaurante.sol_dAtencion += 'Vie,';
    }
    if (this.secondFormGroup.value.Sab) {
      this.objRestaurante.sol_dAtencion += 'Sab,';
    }
    if (this.secondFormGroup.value.Dom) {
      this.objRestaurante.sol_dAtencion += 'Dom,';
    }
    this.objRestaurante.sol_tipo = this.firstFormGroup.value.tipo;

    console.log(this.objRestaurante);
  }

}
