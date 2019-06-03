import { Component, OnInit, Inject } from '@angular/core';
import { MenuComponent, DialogData } from '../menu/menu.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-model-inforest',
  templateUrl: './model-inforest.component.html',
  styleUrls: ['./model-inforest.component.scss']
})
export class ModelInforestComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
