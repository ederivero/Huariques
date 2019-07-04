import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  restId: any;

  constructor(
    private _sRest: RestService,

  ) {

    this.restId=this._sRest.getIdRest();

  }

  ngOnInit() {
  }

}
