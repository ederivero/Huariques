import { Component, OnInit, Input } from '@angular/core';
import { Marcador } from './../../models/Marcador';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { AuthServiceLocal } from 'src/app/services/auth.service';


// import {DatsenComponent} from '../datsen/datsen.component';

@Component({
  selector: 'app-mapa-datasensible',
  templateUrl: './mapa-datasensible.component.html',
  styleUrls: ['./mapa-datasensible.component.scss']
})
export class MapaDatasensibleComponent implements OnInit {

  objMarcador: Marcador;

  latitud;
  longitud;




  // @ViewChild("") dataSen:DatsenComponent

  title: string = 'My first AGM project';
  lat: number = -16.4142104;
  lng: number = -71.5398665;

  espacio = 10;

  icon = {
    url: '../../../img/tacaspastor.jpg',
    scaledSize: { height: 40, width: 40 }
  }

  markers = [
    {
      latitude: 52.228973,
      longitude: 20.728218
    }
  ];

  
  id_prod: any;
  p_desc: any;
  p_disp: any;
  p_nomb: any;
  p_prec: any;
  p_imagen: any;




  cargado = false;
  p_cadauno = [];
  dataSource;
  usuIdM: number;
  restIdM: number;
  pos: number;
  resultDat=[];

  noHayRest = true;
  leer= true;
  restId: any;
  user: any;
  usuId: any;
  tipoUsu: any;
  suscriptor: any;
  infoRest: any;
  result: any;
  load: boolean;
  


  constructor( ruta: ActivatedRoute,
    private _sRest: RestService,
    private _router: Router,
    private _authServ: AuthServiceLocal
    
    ) {

      if (localStorage.getItem('idR')) {
        this.restId = JSON.parse(localStorage.getItem('idR'));
        // console.log(this.restId);
        
  
        this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
          this.user = res.content;
          // console.log(this.user);
          this.user.forEach((e) => {
            this.usuId = e.usu_id;
            this.tipoUsu = e.usu_tipo;
          })
          // console.log(this.usuId);
    
          if (this.tipoUsu == 0) {
            this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {
    
              // this.restId = this._sRest.recibirRest()
              // // console.log(this.restId);
    
              this.infoRest = this._sRest.getInfoRest(this.restId).subscribe((dataInfoRest: any) => {
                // console.log(dataInfoRest.content);
    
                dataInfoRest.content.forEach(idForRest => {
    
                  this.resultDat.push({
                    rest_id: idForRest.rest_id,
                    rest_rSocial: idForRest.rest_rSocial,
                    rest_direccion: idForRest.rest_direccion,
                    rest_img: idForRest.rest_img,
                    rest_dAtencion: idForRest.rest_dAtencion,
                    rest_refUbicacion: idForRest.rest_refUbicacion,
                    rest_hApertura: idForRest.rest_hApertura,
                    rest_hCierre: idForRest.rest_hCierre,
                    rest_info:idForRest.rest_info,
                    usu_id:idForRest.usu_id,
                    rest_verificacion:idForRest.rest_verificacion,
                    rest_telefono:idForRest.rest_telefono,
                    rest_lat:idForRest.rest_lat,
                    rest_lng:idForRest.rest_lng,
                    rest_estado:idForRest.rest_estado,
                    rest_avisos:idForRest.rest_avisos

    
                    
    
                  })
    
    
                });
                // console.log(this.resultDat);
                
    
                this.load = true;
                this.cargado = true
                this.noHayRest = false;
    
              })
    
    
            })
          } else {
            this._router.navigateByUrl('');
          }
    
        })    
        
          
  
      }else{
  
      this.restId = this._sRest.getIdRest();  
      // console.log(this.restId);

      this._authServ.getUserLogged(this._authServ.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        // console.log(this.user);
        this.user.forEach((e) => {
          this.usuId = e.usu_id;
          this.tipoUsu = e.usu_tipo;
        })
        // console.log(this.usuId);
  
        if (this.tipoUsu == 0) {
          this.suscriptor = this._sRest.getRestByUsuId(this.usuId).subscribe((datarest: any) => {
  
            // this.restId = this._sRest.recibirRest()
            // // console.log(this.restId);
  
            this.infoRest = this._sRest.getInfoRest(this.restId).subscribe((dataInfoRest: any) => {
              // console.log(dataInfoRest.content);
  
              dataInfoRest.content.forEach(idForRest => {
  
                this.resultDat.push({
                  rest_id: idForRest.rest_id,
                  rest_rSocial: idForRest.rest_rSocial,
                  rest_direccion: idForRest.rest_direccion,
                  rest_img: idForRest.rest_img,
                  rest_dAtencion: idForRest.rest_dAtencion,
                  rest_refUbicacion: idForRest.rest_refUbicacion,
                  rest_hApertura: idForRest.rest_hApertura,
                  rest_hCierre: idForRest.rest_hCierre,
                  rest_info:idForRest.rest_info,
                  usu_id:idForRest.usu_id,
                  rest_verificacion:idForRest.rest_verificacion,
                  rest_telefono:idForRest.rest_telefono,
                  res_lat:idForRest.rest_lat,
                  rest_lng:idForRest.rest_lng,
                  rest_estado:idForRest.rest_estado,
                  rest_avisos:idForRest.rest_avisos
                  
  
                })
  
  
              });
              // console.log(this.resultDat);
              
  
              this.load = true;
              this.cargado = true
              this.noHayRest = false;
  
            })
  
  
          })
        } else {
          this._router.navigateByUrl('');
        }
  
      })
  
  
      
      } 
  
    











  }




    // fetch(`https://huariquesback.herokuapp.com/api/restaurante/getByUsuId/${this.usuIdM}`)
    //   .then(resp => {
    // //     // console.log("SFsfsgsgs");
    //     return resp.json()
    //   }).then(datR => {
    // //     // console.log(datR.content);
    // //     // console.log(usuId);
    // //     // console.log(restId);

    //     this.resultDat = this.getElementByPosition(datR.content,this.pos)
    // //     console.log(this.resultDat);
        

    //     this.cargado = true
    //     this.noHayRest = false;
    //     datR.content.forEach(idRest => {

    //       // this.r_id = idRest.rest_id;
    //       // this.r_soc = idRest.rest_rSocial;
    //       // this.r_dir = idRest.rest_direccion;
    //       // this.r_img = idRest.rest_img

    //       // this.restInfo.push({
    //       //   rId: idRest.rest_id,
    //       //   rSocial: idRest.rest_rSocial,
    //       //   rDir: idRest.rest_direccion,
    //       //   img: idRest.rest_img
    //       // })

    //     });
    // //     // console.log(this.r_soc);

    //   })

    //   fetch(`https://huariquesback.herokuapp.com/api/producto/porIdRest/${this.restIdM}`)
    //   .then(response => {
    // //     // console.log("productos");
    //     return response.json()
    //   }).then(dataprod => {

    // //     // console.log(dataprod.content);

    //     dataprod.content.forEach(idForProd => {
    // //       // console.log(idForRest);

    // //       console.log(this.id_prod = idForProd.prod_id);
    //       this.p_desc = idForProd.prod_desc;
    //       this.p_disp = idForProd.prod_disp;
    //       this.p_nomb = idForProd.prod_nom;
    //       this.p_prec = idForProd.prod_precio;
    //       this.p_imagen = idForProd.prod_img;

    //       if (!this.p_imagen) {
    //         this.p_imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
    //       }

    //       this.cargado = true;

    //       // this.p_cadauno.push({
    //       //   pId: idForProd.prod_id,
    //       //   pDesc: idForProd.prod_desc,
    //       //   pDisp: idForProd.prod_disp,
    //       //   pNom: idForProd.prod_nom,
    //       //   pPre: idForProd.prod_precio,
    //       //   img: idForProd.prod_img

    //       // })

    //     })

    // //     // console.log(this.p_cadauno);
    //     // 


    //   })



  

  ngOnInit() {
    // // console.log(this.objMarcador);

  }
  modDataSen(){
    
  }

  getElementByPosition(array, position) {
    
    var elemento = [];
    if (position>1) {
      var reem = position - 1
      elemento = array[reem];
      // console.log(reem);
    
      // // console.log(elemento);

      // this.load = true;
      return elemento;

    } else {
      elemento = array[position];
      // // console.log(position);
    
      // // console.log(elemento);
      // this.load = true;
      return elemento;

    }


    
  }

  posicionMarcador(posicion: any) {
    const lat = posicion.coords.lat;
    const lng = posicion.coords.lng;


    this.markers.push({ latitude: lat, longitude: lng });
    this.markers.splice(0, 1);


  };

  agregarMarcador(evento) {
    let objMarcador = new Marcador(evento.coords.lat, evento.coords.lng);
    localStorage.setItem("marcadores", JSON.stringify(objMarcador));

    this.latitud = +this.objMarcador.lat;
    this.longitud = +this.objMarcador.lng;

  }

}
