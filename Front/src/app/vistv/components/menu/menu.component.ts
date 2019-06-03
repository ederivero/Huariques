import { Component, OnInit } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalProductoComponent } from '../modal-producto/modal-producto.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { SnackbarProductComponent } from '../snackbar-product/snackbar-product.component';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  durationInSeconds = 1;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarProductComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalProductoComponent, {
      width: '300px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


}
