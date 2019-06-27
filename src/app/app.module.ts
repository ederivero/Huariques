import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Material.module';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromocionesComponent } from './components/promociones/promociones.component';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './components/login/login.component';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TablemapComponent } from './components/tablemap/tablemap.component';


import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

import { ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { RatingModule } from 'ng-starrating';


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
    InicioComponent,
    PromocionesComponent,
    LoginComponent,
    TablemapComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBcjhtE0FIFEO92Z_7xKQWODx3I_QXq33E'
    }),
    SocialLoginModule,
    ReactiveFormsModule,
    RatingModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: provideConfig
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
