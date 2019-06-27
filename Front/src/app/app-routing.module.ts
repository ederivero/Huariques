import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { PromocionesComponent } from './components/promociones/promociones.component';
import { RestDetailsComponent } from './components/rest-details/rest-details.component';
import { TablemapComponent } from './components/tablemap/tablemap.component';
import { GestRestComponent } from './components/gest-rest/gest-rest.component';
import { RegistroComponent } from './components/registro/registro.component';

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
    path: 'rest-details/:id',
    component: RestDetailsComponent
  },
  {
    path: 'busqueda/:nombre',
    component: TablemapComponent
  },
  {
    path:'*',
    component:PromocionesComponent
  },
  {
    path:'gest/:id',
    component: GestRestComponent
  },
  {
    path: 'vistv/:usuId/:restId',
    loadChildren: './vistv/vistv.module#VistvModule'
  },
  {  
    path: 'agregar',
    component: RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
