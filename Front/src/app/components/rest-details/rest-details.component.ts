import { Component, OnInit, HostListener } from '@angular/core';
import { CalificanosComponent } from '../calificanos/calificanos.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from "@angular/router";
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],

})
export class RestDetailsComponent implements OnInit {
  public innerWidth: any;
  calificaciones=false;
  sumapromedios = 0
  i=0
  promediototal=0;
  imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9";
  horarioaperturaActual = "12:00"
  horariofinActual = "12:00";
  feriadors: Boolean = true;
  estado: Boolean = false;
  title: string = 'Anticucheria la ultima cena';
  direccion: string = ''
  telefono: string = ''
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  categoriasruta = []
  categorias = []
  dias: Array<String> = ["Lun", "Mar", "Mier", "Jue", "Vier", "Sab", "Dom"]
  horarios: Array<any> = []
  comentarios: Array<any> = [{
    id: 1,
    nombre: "Joel",
    comentario: "Recomendado",
    rating: 5
  },
  {
    id: 2,
    nombre: "Juan Perez",
    comentario: "Hace unos buenos anticuchos",
    rating: 4.5
  },
  {
    id: 3,
    nombre: "Maria la del barrio",
    comentario: "No me fue muy bien, aunque igual estaban ricos los anticuchos",
    rating: 1.5
  }]

  constructor(public dialog: MatDialog, private ruta: ActivatedRoute) {
    var rutaActual = ruta.snapshot.params.id - 1;
    fetch(`https://huariquesback.herokuapp.com/api/restcategoria/rest/${rutaActual + 1}`).then(response => {
      return response.json()
    }).then(datacat => {
      // console.log(datacat.content)
      datacat.content.forEach(idcat => {
        this.categoriasruta.push({ ruta: "./assets/images/" + idcat.cat_id + ".png" })
      })
    })
    this.obtenerDiaActual()
    this.comentarios = []
    fetch(`https://huariquesback.herokuapp.com/api/regcli/encontrarporrest/${rutaActual + 1}`).then(response => {
      return response.json();
    }).then(datareg => {
      // console.log(datareg.content)
      datareg.content.forEach(registro => {
        // console.log(registro)
        fetch(`https://huariquesback.herokuapp.com/api/puntuacion/mostrar/${registro.regCliente_id}`).then(response => {
          return response.json()
        }).then(data1 => {
          // console.log(data1.content)
          if (data1.content != "") {
            fetch(`https://huariquesback.herokuapp.com/api/usuario/traerporid/${registro.usu_id}`).then(response => {
              return response.json();
            }).then(data => {
              var año = new Date(registro.regCliente_fecha).getFullYear()
              var mes1 = new Date(registro.regCliente_fecha).getMonth()
              var dia1 = new Date(registro.regCliente_fecha).getDate()
              var dia
              var mes
              if(dia1<10){
                dia="0"+dia1.toString()
              }else{
                dia=dia1
              }
              if(mes1<10){
                mes="0"+mes1.toString()
              }else{
                mes=mes1
              }
              var date:string= `${dia}/${mes}/${año}`
              this.i++
              this.sumapromedios+=data1.content[0].punt_total
              this.promediototal=this.sumapromedios/this.i
              if(this.promediototal!=NaN||this.promediototal!=0){
                this.calificaciones=true
              }
              // console.log(data.content)
              this.comentarios.push({
                fecha:date,
                imagen:data.content[0].usu_img,
                id: registro.usu_id,
                nombre: data.content[0].usu_nom,
                comentario: data1.content[0].punt_coment,
                rating: data1.content[0].punt_total
              })
            })
          }
        })
      });
      // console.log(this.comentarios)
    })
    fetch('https://huariquesback.herokuapp.com/api/restaurante/traertodos').then((response) => {
      return response.json()
    }).then((data) => {
      // console.log(data.content[rutaActual])
      this.imagen = data.content[rutaActual].rest_img;
      if (!this.imagen) {
        this.imagen = "https://firebasestorage.googleapis.com/v0/b/api-project-161182547768.appspot.com/o/restaurantes%2Ffotito.png?alt=media&token=9b1da490-016c-4c08-b7f2-69e07f8137e9"
      }
      this.telefono = data.content[rutaActual].rest_telefono;
      this.direccion = data.content[rutaActual].rest_direccion;
      this.title = data.content[rutaActual].rest_rSocial;
      this.lat = +data.content[rutaActual].rest_lat;
      this.lng = +data.content[rutaActual].rest_lng;
      // console.log(data.content[rutaActual].rest_dAtencion.split(','))
      data.content[rutaActual].rest_dAtencion.split(',').forEach(dia => {
        this.horarios.push({
          rest_dAtencion: dia,
          rest_hApertura: data.content[rutaActual].rest_hApertura,
          rest_hCierre: data.content[rutaActual].rest_hCierre
        });
      });
      this.obtenerDiaActual();
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    console.log(this.innerWidth)
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth
  }
  openDialog(): void {
    if (localStorage.getItem('token')) {
      if (this.innerWidth <= 900) {
        const dialogRef = this.dialog.open(CalificanosComponent, {
          width: '60%',
        });
        dialogRef.componentInstance.rutaActual = this.ruta.snapshot.params.id
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      } else {
        const dialogRef = this.dialog.open(CalificanosComponent, {
          width: '40%',
        });
        dialogRef.componentInstance.rutaActual = this.ruta.snapshot.params.id
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      }

    } else {
      if (this.innerWidth <= 1000) {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '50%'
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      } else {
        const dialogRef = this.dialog.open(LoginComponent, {
          width: '30%'
        });
        dialogRef.afterClosed().subscribe(() => {
          console.log('The dialog was closed');
        });
      }

    }

  }
  obtenerDiaActual() {
    var diaActualN = new Date();
    let diaDeSemanaActual = this.dias[diaActualN.getDay() - 1]
    let horaActual = diaActualN.getHours();

    // console.log(diaDeSemanaActual)
    this.horarios.forEach(horario => {
      if (diaDeSemanaActual == horario.rest_dAtencion) {
        this.horariofinActual = horario.rest_hCierre
        this.horarioaperturaActual = horario.rest_hApertura
      }
    });
    var horaMax = +this.horariofinActual.split(':')[0]
    var horaMin = +this.horarioaperturaActual.split(':')[0]
    if (horaActual > horaMin && horaActual < horaMax) {
      this.estado = true
    } else {
      this.estado = false
    }
    // console.log(horaActual)
    // console.log(horaMin)
    // console.log(horaMax)
  }

}
