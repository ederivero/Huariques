import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  ngOnInit() {
  }

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
