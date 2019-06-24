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
  @ViewChild(MatPaginator,{static:false}) set matSort(content: MatPaginator) {
    this.paginator = content;
    if (this.paginator){
       this.rests.paginator = this.paginator;
    }
  }
  @ViewChild(MatSort,{static:false}) set content(content: MatSort) {
    this.sort = content;
    if (this.sort){
       this.rests.sort = this.sort;
    }
  }
  constructor(private _sRest: RestService,
              private _el: ElementRef) { }

  displayedColumns: string[] = ['rest_rSocial', 'rest_info'];


  ngOnInit() {
    this.suscriptor = this._sRest.getRest().subscribe((resp: any) => {
      this.markers = resp.content;
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

}
