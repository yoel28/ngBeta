import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AgencyModule} from './modules/agency/agency.module';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/agency/agency.module')
      .then(m => m.AgencyModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AgencyModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
