import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestRestComponent } from './components/gest-rest/gest-rest.component';
import { InicioComponent } from './components/inicio/inicio.component';

const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path:'gest',
    component: GestRestComponent

  },
  {
    path: 'vistv',
    loadChildren: './vistv/vistv.module#VistvModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
