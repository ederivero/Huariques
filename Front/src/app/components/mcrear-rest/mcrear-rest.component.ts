import { Component, OnInit, Input } from '@angular/core';
import { Marcador } from './../../vistv/models/Marcador';

import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceLocal } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-mcrear-rest',
  templateUrl: './mcrear-rest.component.html',
  styleUrls: ['./mcrear-rest.component.scss']
})
export class McrearRestComponent implements OnInit {

  objMarcador = []

  lat: number = -16.4142104;
  lng: number = -71.5398665;
  srcResult: any;

  markers = [
    {
      latitude: 52.228973,
      longitude: 20.728218
    }
  ];
  latR: number;
  lngR: number;
  nMarkers = [];
  rMarkers = [];
  cadauno = [];
  // nMark=[{
  //   latitude: '',
  //   longitude: ''
  // }]
  nMark: string;

  // checked = true;

  imagen: any[];
  restId: number;
  usuId;
  rest_img: any[];

  objRestaurante = {
    rest_avisos: 'aun no disponible',
    rest_rSocial: '',
    rest_estado: '1',
    usu_id: '',
    rest_img: '',
    rest_verificacion: '1',
    rest_direccion: '',
    rest_lat: 0.0,
    rest_lng: 0.0,
    rest_info: '',
    rest_telefono: '',
    rest_dAtencion: 'Lun,Mar,Mie,Jue,Vie,Sab,Dom',
    rest_hApertura: '',
    rest_hCierre: '',
    rest_refUbicacion: ''
  };

  objNRest = {
    n_rSocial: '',
    n_rDir: '',
    n_rRefDir: '',
    n_rTel: 0,
    n_rLat: 0,
    n_rLng: 0,
    n_rInfo: '',
    n_rImg: '',
    n_rRefUbic: '',
    n_rDAt: '',
    n_rHAp: '',
    n_rHCer: ''
  }
  inputValue: any;


  chL = true;
  chM = true;
  chMi = true;
  chJ = true;
  chV = true;
  chS = true;
  chD = true;

  opcion1
  opcion2

  isChecked: boolean;
  checked = true;
  user: any;
  tipoUsu: any;
  enviando: boolean;

  constructor(ruta: ActivatedRoute,
              private _authServ: AuthServiceLocal,
              private _sRest: RestService,
              private _router: Router

  ) {
    this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
      this.user = res.content;
      // console.log(this.user);
      this.user.forEach((e) => {
        this.usuId = e.usu_id;
        this.tipoUsu = e.usu_tipo;
      })
      // console.log(this.usuId);

    })

    // console.log(this.objRestaurante);
    
    // this.usuId = +ruta.snapshot.params.usuId
    // this.restId = +ruta.snapshot.params.restId

  }

  ngOnInit() {
  }

  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        // console.log(this.srcResult);

      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }

  onFileChange(event) {
    this.imagen = event.target.files;
    // console.log(this.imagen);
  }

  posicionMarcador(posicion: any) {
    const lat = posicion.coords.lat;
    const lng = posicion.coords.lng;


    this.markers.push({ latitude: lat, longitude: lng });
    this.markers.splice(0, 1);


  };

  onKey(event) {
    this.inputValue = event.target.value;
    this.objNRest.n_rLat = this.inputValue;
    // console.log(this.objNRest.n_rLat);

  }

  crearRest() {
    this.enviando=false;

    // console.log(this.objNRest);
    // console.log(this.checked);

    // console.log(this.objRestaurante);
    
    // <input type="checkbox" name="checkbox" [(ngModel)]="isChecked">

    var formData = new FormData();
    formData.append('rest_img', this.imagen[0],this.imagen[0].name);
    formData.append('rest_rSocial', this.objRestaurante.rest_rSocial);
    formData.append('usu_id', this.usuId);
    formData.append('rest_direccion',this.objRestaurante.rest_direccion);
    formData.append('rest_lat',this.markers[0].latitude.toString());
    formData.append('rest_lng',this.markers[0].longitude.toString());
    formData.append('rest_info',this.objRestaurante.rest_info);
    formData.append('rest_telefono',this.objRestaurante.rest_telefono);
    formData.append('rest_dAtencion',this.objRestaurante.rest_dAtencion);
    formData.append('rest_hApertura',this.objRestaurante.rest_hApertura);
    formData.append('rest_hCierre',this.objRestaurante.rest_hCierre);
    formData.append('rest_refUbicacion',this.objRestaurante.rest_refUbicacion);
    formData.append('rest_avisos',this.objRestaurante.rest_avisos);
    formData.append('rest_estado',this.objRestaurante.rest_estado);
    formData.append('rest_verificacion',this.objRestaurante.rest_verificacion);
    
    // console.log(formData);


    // let headersRest = {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(this.objRestaurante)
    // };
    let headersRest = {
      method: 'POST',
      body: formData
    };

    fetch(`https://huariquesback.herokuapp.com/api/restaurante/crear`, headersRest)
      .then(response => {
        return response.json()
      }).then(datarest => {
        // console.log(datarest.content)
        this.enviando=true
                              // this.dialogRef.close();    

        // console.log("Exito");
        



      })


  }

}
