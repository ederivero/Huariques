import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-rest-details',
  templateUrl: './rest-details.component.html',
  styleUrls: ['./rest-details.component.scss'],
  
})
export class RestDetailsComponent implements OnInit {

  
  title: string = 'La Sanguchera';
  lat: number = -16.4310132;
  lng: number = -71.5189799;

  constructor() {}

  ngOnInit() {
  }

}
