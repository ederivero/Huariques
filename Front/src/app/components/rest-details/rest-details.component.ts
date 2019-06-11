import { Component, OnInit } from '@angular/core';
import { CalificanosComponent } from '../calificanos/calificanos.component';
import { MatDialog } from '@angular/material/dialog';
import { asapScheduler } from 'rxjs';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],

})
export class RestDetailsComponent implements OnInit {

  horarioaperturaActual = "12:00"
  horariofinActual = "12:00";
  feriadors: Boolean = true;
  estado: Boolean = false;
  title: string = 'Anticucheria la ultima cena';
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  dias: Array<String> = ["Lun", "Mar", "Mier", "Jue", "Vier", "Sab", "Dom"]
  horarios: Array<any> = [{
    rest_dAtencion: "Lunes",
    rest_hApertura: "18:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Martes",
    rest_hApertura: "18:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Miercoles",
    rest_hApertura: "18:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Jueves",
    rest_hApertura: "18:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Viernes",
    rest_hApertura: "16:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Sabado",
    rest_hApertura: "13:00",
    rest_hCierre: "22:00"
  },
  {
    rest_dAtencion: "Domingo",
    rest_hApertura: "13:00",
    rest_hCierre: "22:00"
  }]
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
    // console.log(ruta.snapshot.params.id)
    var rutaActual = ruta.snapshot.params.id
    this.obtenerDiaActual()
    this.comentarios=[]
    fetch(`https://huariquesback.herokuapp.com/api/regcli/encontrarporrest/${rutaActual}`).then(response => {
      return response.json();
    }).then(datareg => {
      // console.log(datareg.content)
      datareg.content.forEach(registro => {
        fetch(`https://huariquesback.herokuapp.com/api/puntuacion/mostrar/${registro.regCliente_id}`).then(response => {
          return response.json()
        }).then(data1 => {
          // console.log(data1.content[0].punt_coment)
          fetch(`https://huariquesback.herokuapp.com/api/usuario/traerporid/${registro.usu_id}`).then(response => {
            return response.json();
          }).then(data => {
            // console.log(data.content[0].usu_nom)
            this.comentarios.push({
              id: registro.usu_id,
              nombre:data.content[0].usu_nom,
              comentario:data1.content[0].punt_coment,
              rating:data1.content[0].punt_total
            })
          })
        })
      });
      console.log(this.comentarios)
    })
    fetch('https://huariquesback.herokuapp.com/api/restaurante/traertodos').then((response) => {
      return response.json()
    }).then((data) => {
      // console.log(data.content[rutaActual])
      this.title = data.content[rutaActual].rest_rSocial;
      this.lat = +data.content[rutaActual].rest_lat;
      this.lng = +data.content[rutaActual].rest_lng;
      this.horarios = []
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

  ngOnInit() {

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(CalificanosComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
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
