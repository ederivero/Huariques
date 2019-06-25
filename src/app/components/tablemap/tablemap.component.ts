import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { InfoWindowManager } from '@agm/core';

import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs';

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
  openedWindow : number = 0;

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
  constructor(private _sRest: RestService,
    private _el: ElementRef) { }

  displayedColumns: string[] = ['rest_rSocial', 'rest_info'];

  ngOnInit() {
    this.suscriptor = this._sRest.getRest().subscribe((resp: any) => {
      this.markers = resp.content;
      this.markers.forEach((element: any) => {
        let cont = 0;
        let promedio = 0;
        element.t_productos.forEach((product: any) => {
          promedio = +product.prod_precio + promedio;
          cont++;
        })
        let proProd = promedio / cont;
        if (proProd > 0) {
          element.precioProm = proProd;
        } else {
          element.precioProm = 0;
        }
      });
      this.restList = resp.content;
      this.rests = new MatTableDataSource(this.restList);
    })
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
    console.log(event);
    
    this.lat= +event.latitude+0.002;
    this.lng= +event.longitude;
  }
  verMarker(restId){
    let l = this.markers.find(rest=>rest.rest_id==restId);
    this.lat=+l.rest_lat+0.002;
    this.lng=+l.rest_lng;
    console.log(l);                
  }

  openWindow(id) {
    let l = this.markers.find(rest=>rest.rest_id==id);
    this.lat=+l.rest_lat+0.002;
    this.lng=+l.rest_lng;
    this.openedWindow = id; // alternative: push to array of numbers
}

isInfoWindowOpen(id) {
    return this.openedWindow == id; // alternative: check if id is in array
}

}
