import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { RestDetailsComponent } from './components/rest-details/rest-details.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'promo',
    component: PromocionesComponent
  },
  {
    path: 'rest-details',
    component: RestDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
