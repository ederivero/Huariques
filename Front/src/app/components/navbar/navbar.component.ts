import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../../components/login/login.component';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  inicio:boolean=false;
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
    // console.log(window.location.href);
    // console.log(window.location.href.split('/')[3])
    if(window.location.href.split('/')[3]===""){
      this.inicio=true
    }else{
      this.inicio=false
    }
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
  ngOnInit() {
  }

}
