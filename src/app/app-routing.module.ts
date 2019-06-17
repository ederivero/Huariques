import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { TablemapComponent } from './components/tablemap/tablemap.component';
import { LoggedInService } from './services/logged-in.service';
import { LoggedOutService } from './services/logged-out.service';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent,
    canActivate:[LoggedOutService]
  },
  {
    path: 'promo',
    component: PromocionesComponent,
    canActivate:[LoggedInService]
  },
  {
    path: 'table',
    component: TablemapComponent,
    canActivate:[LoggedInService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
