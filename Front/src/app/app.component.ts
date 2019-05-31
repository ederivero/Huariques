import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog){
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '30%',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
