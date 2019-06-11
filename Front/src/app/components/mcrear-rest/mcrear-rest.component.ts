import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mcrear-rest',
  templateUrl: './mcrear-rest.component.html',
  styleUrls: ['./mcrear-rest.component.scss']
})
export class McrearRestComponent implements OnInit {

  lat: number = -16.4142104;
  lng: number = -71.5398665;


  constructor() { }

  ngOnInit() {
  }

}
