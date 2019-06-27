import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  isLinear = false;
  imagen: any[];
  firstFormGroup: FormGroup;
  objRestaurante = {
    sol_rSocial: '',
    sol_direccion: '',
    sol_lat: 0.0,
    sol_lng: 0.0,
    sol_email: '',
    sol_tipo: 0,
    sol_info: '', // extras
    sol_telefono: '',
    sol_dAtencion: '',
    sol_hApertura: '',
    sol_hCierre: '',
    sol_refUbicacion:''
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
  onFileChange(event) {
    this.imagen = event.target.files;
    console.log(this.imagen);
  }
  enviar() {
    var formData = new FormData();
    console.log(this.imagen);
    this.objRestaurante.sol_dAtencion = '';
    this.objRestaurante.sol_info = '';
    this.objRestaurante.sol_info = this.secondFormGroup.value.desc;
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
    formData.append('imagen',
      this.imagen[0],
      this.imagen[0].name);
    formData.append('rest_rSocial', this.objRestaurante.sol_rSocial)
    formData.append('rest_direccion', this.objRestaurante.sol_direccion)
    formData.append('rest_telefono', this.objRestaurante.sol_telefono)
    formData.append('rest_lat', this.objRestaurante.sol_lat.toString())
    formData.append('rest_lng', this.objRestaurante.sol_lng.toString())
    formData.append('rest_info', this.objRestaurante.sol_info)
    formData.append('rest_refUbicacion', this.objRestaurante.sol_refUbicacion)
    formData.append('rest_dAtencion', this.objRestaurante.sol_dAtencion)
    formData.append('rest_hApertura', this.objRestaurante.sol_hApertura)
    formData.append('rest_hCierre', this.objRestaurante.sol_hCierre)
    formData.append('sol_tipo',this.objRestaurante.sol_tipo.toString())
    formData.append('rest_avisos', 'prueba')
    let headersRest = {
      method: 'POST',
      body: formData
    };
    fetch('https://huariquesback.herokuapp.com/api/solicitud/crear', headersRest)
      .then(response => {
        console.log(response)
        return response.json();
      }).then(data => {
        console.log(data);
        alert("restaurante subido exitosamente")
      })
  }


}
