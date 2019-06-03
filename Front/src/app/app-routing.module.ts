import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestRestComponent } from './components/gest-rest/gest-rest.component';

const routes: Routes = [
  {
    path: '',
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
