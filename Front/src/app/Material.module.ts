import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [],
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, MatListModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDividerModule, MatListModule]
})
export class MaterialModule { }
