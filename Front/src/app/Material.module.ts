import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule,  ReactiveFormsModule   } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import { AgmCoreModule } from '@agm/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    ChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCardModule,
    AgmCoreModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule

    // MatTableDataSource



  ],
  exports:[
    MatButtonModule, 
    MatCheckboxModule,
    ChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatCardModule,
    AgmCoreModule,
    MatDividerModule,
    MatListModule,
    ReactiveFormsModule
    // MatTableDataSource

  ]
})
export class MaterialModule { }
