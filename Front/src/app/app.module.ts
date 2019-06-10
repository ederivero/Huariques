import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GestRestComponent } from './components/gest-rest/gest-rest.component';
import { MaterialModule } from './material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { McrearRestComponent } from './components/mcrear-rest/mcrear-rest.component';
// import { MatTableDataSource } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    GestRestComponent,
    McrearRestComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    // MatTableDataSource
  ],
  entryComponents:[
    McrearRestComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
