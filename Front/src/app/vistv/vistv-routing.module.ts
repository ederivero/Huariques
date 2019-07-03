import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlankComponent } from './components/blank/blank.component';
import { componentFactoryName } from '@angular/compiler';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MenuComponent } from './components/menu/menu.component';
import { MapaDatasensibleComponent } from './components/mapa-datasensible/mapa-datasensible.component';

const routes: Routes = [
  {
    path:'',
    component: BlankComponent,
    // component: DashboardComponent,
    children:[
      {
        path:'prin',
        component: DashboardComponent
      },
      {
        path:'edmen',
        component: MenuComponent
      },
      {
        path:'datsen',
        component: MapaDatasensibleComponent
      }
    ]
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VistvRoutingModule { }
