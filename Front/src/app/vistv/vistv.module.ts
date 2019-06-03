import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VistvRoutingModule } from './vistv-routing.module';
import { BlankComponent } from './components/blank/blank.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { DatsenComponent } from './components/datsen/datsen.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { MaterialModule } from '../material.module';
import { ModalProductoComponent } from './components/modal-producto/modal-producto.component';
import { TablaProductoComponent } from './components/tabla-producto/tabla-producto.component';
import { AnilloChartComponent } from './components/anillo-chart/anillo-chart.component';
import { RadarChartComponent } from './components/radar-chart/radar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { MapaDatasensibleComponent } from './components/mapa-datasensible/mapa-datasensible.component';
import { AgmCoreModule } from '@agm/core';
import { ModelInforestComponent } from './components/model-inforest/model-inforest.component';
import { SnackbarProductComponent } from './components/snackbar-product/snackbar-product.component';



@NgModule({
  declarations: [BlankComponent, DashboardComponent, MenuComponent, DatsenComponent,BarChartComponent, ModalProductoComponent, TablaProductoComponent, AnilloChartComponent, RadarChartComponent, PieChartComponent, MapaDatasensibleComponent, ModelInforestComponent, SnackbarProductComponent],
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
    ModelInforestComponent,
    SnackbarProductComponent
    
  ]
})
export class VistvModule { }
