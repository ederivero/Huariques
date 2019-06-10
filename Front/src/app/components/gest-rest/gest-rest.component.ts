import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModelInforestComponent} from '../../vistv/components/model-inforest/model-inforest.component';
import { McrearRestComponent } from '../mcrear-rest/mcrear-rest.component';

@Component({
  selector: 'app-gest-rest',
  templateUrl: './gest-rest.component.html',
  styleUrls: ['./gest-rest.component.scss']
})
export class GestRestComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(McrearRestComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


