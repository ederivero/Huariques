import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-calificanos',
  templateUrl: './calificanos.component.html',
  styleUrls: ['./calificanos.component.scss']
})
export class CalificanosComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  

  ngOnInit() {
  }

}
