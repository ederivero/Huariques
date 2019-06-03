import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StarRatingModule } from 'angular-star-rating';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromocionesComponent } from './components/promociones/promociones.component';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';
import { RestDetailsComponent } from './components/rest-details/rest-details.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PromocionesComponent,
    LoginComponent,
    RestDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E'
    })
  ],
  entryComponents:[
    LoginComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
