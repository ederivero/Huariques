import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-calificanos',
  templateUrl: './calificanos.component.html',
  styleUrls: ['./calificanos.component.scss']
})
export class CalificanosComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalificanosComponent>) { }
  onNoClick(): void {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
