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
import { CalificanosComponent } from './components/calificanos/calificanos.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CountUpModule } from 'countup.js-angular2';
import { TablemapComponent } from './components/tablemap/tablemap.component';
import { RegistroComponent } from './components/registro/registro.component';



import { GestRestComponent } from './components/gest-rest/gest-rest.component';
import { McrearRestComponent } from './components/mcrear-rest/mcrear-rest.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { ReactiveFormsModule } from '@angular/forms';

let configLogin = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("21794192303-roga71pcfodl3mi84truru81vgkubpp4.apps.googleusercontent.com")

  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2755826184445833")
  }
]);

export function provideConfig() {
  return configLogin;
}

@NgModule({
  declarations: [
    AppComponent,
    GestRestComponent,
    McrearRestComponent,
    InicioComponent,
    PromocionesComponent,
    LoginComponent,
    RegistroComponent,
    RestDetailsComponent,
    CalificanosComponent,
    TablemapComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    CountUpModule,
    StarRatingModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E'
    }),
    SocialLoginModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  entryComponents:[
    
    McrearRestComponent,
    LoginComponent,
    CalificanosComponent
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
