
import { ClickEvent } from 'angular-star-rating';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthServiceLocal } from 'src/app/services/auth.service';

@Component({
  selector: 'app-calificanos',
  templateUrl: './calificanos.component.html',
  styleUrls: ['./calificanos.component.scss']
})
export class CalificanosComponent implements OnInit {

  rutaActual;
  enviando: boolean = true;
  TOTAL: Number;
  Comentario: String;
  onClickResult: ClickEvent;
  onClickResult2: ClickEvent;
  onClickResult3: ClickEvent;
  onClick1 = ($calidad: ClickEvent) => {
    this.onClickResult = $calidad;
    // // console.log('onClick $calidad: ', $calidad.rating);
    // // console.log('onclick result ', this.onClickResult.rating);
  };
  onClick2 = ($cantidad: ClickEvent) => {
    this.onClickResult2 = $cantidad;
    // // console.log('onclick result 2: ', this.onClickResult2.rating);
  };
  onClick3 = ($limpieza: ClickEvent) => {
    this.onClickResult3 = $limpieza;
    // // console.log('onClick $limpieza: ', $limpieza.rating);
  };
  user: any;
  p: any;
  userId: any;
  onKey(event) {
    this.Comentario = event.target.value;
  }
  /*Puntuacion(){
    if(this.onClickResult===undefined||this.onClickResult2===undefined||this.onClickResult3===undefined||this.Comentario===undefined){
      alert("faltan campos")
    }else{
      this.TOTAL = (this.onClickResult.rating + this.onClickResult2.rating + this.onClickResult3.rating) / 3;
      this.TOTAL = +this.TOTAL.toFixed(2);
      let objPunt = {
        punt_cali: this.onClickResult.rating,
        punt_cant: this.onClickResult2.rating,
        punt_limp: this.onClickResult3.rating,
        punt_total: this.TOTAL,
        punt_coment: this.Comentario,
      }
      // console.log(objPunt)
    }
  }*/
  Puntuacion() {
    
    if (this.Comentario === undefined) {
      this.Comentario = ""
    }
    if (this.onClickResult === undefined || this.onClickResult2 === undefined || this.onClickResult3 === undefined) {
      alert("faltan campos")
    } else {
      this.enviando = false;
      this.TOTAL = (this.onClickResult.rating + this.onClickResult2.rating + this.onClickResult3.rating) / 3;
      var date;
      date = new Date();
      date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' +
        ('00' + date.getUTCHours()).slice(-2) + ':' +
        ('00' + date.getUTCMinutes()).slice(-2) + ':' +
        ('00' + date.getUTCSeconds()).slice(-2);
      // console.log(date);
      let objreg = {
        regCliente_fecha: date,
        usu_id: this.userId,
        rest_id: +this.rutaActual
      }
      // console.log(objreg)
      let headersReg = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objreg)
      };
      fetch('https://huariquesback.herokuapp.com/api/regcli/crear', headersReg).then(Response => {
        return Response.json()
      }).then(data => {
        // console.log(data.content);
        let objPunt = {
          punt_cali: this.onClickResult.rating,
          punt_cant: this.onClickResult2.rating,
          punt_limp: this.onClickResult3.rating,
          punt_total: this.TOTAL,
          punt_coment: this.Comentario,
          regCliente_id: +data.content.regCliente_id,
        }
        // console.log(objPunt)
        let headersPunt = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(objPunt)
        };
        fetch('https://huariquesback.herokuapp.com/api/puntuacion/crear', headersPunt).then(Response => {
          // console.log(Response)
          return Response.json()
        }).then(data => {
          // console.log(data);
          this.dialogRef.close();
          this.enviando = true;
        })
      })
    }
    // /*console.log( this.onClickResult.rating)
    this.TOTAL = (this.onClickResult.rating + this.onClickResult2.rating + this.onClickResult3.rating) / 3;
    // console.log( this.TOTAL);
    let obj = {
      punt_cali: this.onClickResult.rating,
      punt_cant: this.onClickResult2.rating,
      punt_limp: this.onClickResult3.rating,
      punt_total: this.TOTAL,
      punt_coment: this.Comentario,
      regCliente_id: 1,
    }
    let headers = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    };
    fetch('https://huariquesback.herokuapp.com/api/puntuacion/crear', headers).then(Response => {
      // console.log(Response)
      return Response.json()
    })
      .then(data => {
        // console.log(data);
        this.dialogRef.close();
        this.enviando = true;
      })
    // console.log(obj);*/
  }
  constructor(public dialogRef: MatDialogRef<CalificanosComponent>, private _sAuth:AuthServiceLocal) {
    if (localStorage.getItem('token')) {
      this.user = null;
      this._sAuth.getUserLogged(this._sAuth.getUserDetails().usu_id).subscribe((res: any) => {
        this.user = res.content;
        this.p = res.content[0];
        // console.log(this.user[0].usu_id)
        this.userId=this.user[0].usu_id
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
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    // console.log(this.rutaActual)
  }

}
