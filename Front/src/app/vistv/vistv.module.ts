import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistvRoutingModule } from './vistv-routing.module';
import { BlankComponent } from './components/blank/blank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MaterialModule } from '../material.module';
import { ModalProductoComponent } from './components/modal-producto/modal-producto.component';
import { AnilloChartComponent } from './components/anillo-chart/anillo-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MapaDatasensibleComponent } from './components/mapa-datasensible/mapa-datasensible.component';
import { AgmCoreModule } from '@agm/core';
import { SnackbarProductComponent } from './components/snackbar-product/snackbar-product.component';



@NgModule({
  declarations: [BlankComponent, DashboardComponent, MenuComponent,BarChartComponent, ModalProductoComponent, AnilloChartComponent, PieChartComponent, MapaDatasensibleComponent, SnackbarProductComponent],
  imports: [
    CommonModule,
    VistvRoutingModule,
    // BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MaterialModule,    
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E'
    })
  ],
  entryComponents:[
    ModalProductoComponent,
    SnackbarProductComponent 
  ]
})
export class VistvModule { }