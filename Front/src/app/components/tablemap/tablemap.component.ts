import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { InfoWindowManager } from '@agm/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-tablemap',
  templateUrl: './tablemap.component.html',
  styleUrls: ['./tablemap.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TablemapComponent implements OnInit {

  showFiller = true;
  lat: number = -16.4310132;
  lng: number = -71.5189799;
  markers;
  marcadores = [];
  restList;
  rests;
  expandedElement: any | null;
  paginator;
  sort;
  suscriptor: Subscription;
  mark: Node;
  openedWindow: number = 0;
  currentRate = 3;

  @ViewChild(MatPaginator, { static: false }) set matSort(content: MatPaginator) {
    this.paginator = content;
    if (this.paginator) {
      this.rests.paginator = this.paginator;
    }
  }
  @ViewChild(MatSort, { static: false }) set content(content: MatSort) {
    this.sort = content;
    if (this.sort) {
      this.rests.sort = this.sort;
    }
  }
  constructor(private _sRest: RestService, private ruta: ActivatedRoute) {
    var rutaActual = this.ruta.snapshot.params.nombre;
    if (rutaActual === "todos" || rutaActual==='') {
      this.suscriptor = this._sRest.getRest().subscribe((resp: any) => {
        this.markers = resp.content;
        this.markers.forEach((element: any) => {
          let dias = element.rest_dAtencion.split(',');
          element.dias = dias;
          let cont = 0;
          let promedio = 0;
          element.t_productos.forEach((product: any) => {
            promedio = +product.prod_precio + promedio;
            cont++;
          })
          let proProd = promedio / cont;
          element.rating = this.rating(proProd).toString();
        });
        this.restList = resp.content;
        this.rests = new MatTableDataSource(this.restList);
      })
    } else {
      this.suscriptor = this._sRest.buscarpopalabra(rutaActual).subscribe((resp: any) => {
        console.log(resp.content);

        this.markers = resp.content;
        this.markers.forEach((element: any) => {
          console.log(element);

          let dias = element.rest_dAtencion.split(',');
          element.dias = dias;
          let cont = 0;
          let promedio = 0;
          element.t_productos.forEach((product: any) => {
            promedio = +product.prod_precio + promedio;
            cont++;
          })
          let proProd
          if (cont != 0) { proProd = promedio / cont; }
          else {
            proProd = 0;
          }
          element.rating = this.rating(proProd).toString();
        });
        this.restList = resp.content;
        console.log(this.restList[0]);
        
        this.rests = new MatTableDataSource(this.restList);
      })
    }

  }

  displayedColumns: string[] = ['rest_rSocial', 'rating'];



  ngOnInit() {

  }
  rating(p) {
    if (0 < p && p <= 5) {
      return 1;
    } else if (6 < p && p <= 10) {
      return 2;
    } else if (11 < p && p <= 15) {
      return 3;
    } else if (16 < p && p <= 20) {
      return 3;
    } else if (21 < p && p <= 25) {
      return 4;
    } else if (26 < p) {
      return 5;
    } else {
      return 0;
    }
  }


  applyFilter(filterValue: string) {
    this.rests.filter = filterValue.trim().toLowerCase();

    if (this.rests.paginator) {
      this.rests.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.suscriptor.unsubscribe();
  }
  selectMarker(event) {
    this.lat = +event.latitude + 0.002;
    this.lng = +event.longitude;
  }
  openWindow(id) {
    let l = this.markers.find(rest => rest.rest_id == id);
    this.lat = +l.rest_lat + 0.002;
    this.lng = +l.rest_lng;
    this.openedWindow = id;
  }

  isInfoWindowOpen(id) {
    return this.openedWindow == id;
  }

}
