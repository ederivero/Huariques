import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestRestComponent } from './components/gest-rest/gest-rest.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { McrearRestComponent } from './components/mcrear-rest/mcrear-rest.component';
import { AgmCoreModule } from '@agm/core';
import { InicioComponent } from './components/inicio/inicio.component';
import {MatInputModule} from '@angular/material/input';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material';



// import { MatTableDataSource } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    GestRestComponent,
    McrearRestComponent,
    InicioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    MatInputModule,
    // InicioComponent,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E'
    })
    // AgmCoreModule
    // MatTableDataSource
  ],
  entryComponents:[
    McrearRestComponent
  ],
  providers: [
      {provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check'}

  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
