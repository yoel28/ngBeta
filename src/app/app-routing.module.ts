import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EditComponent} from './modules/agency/component/edit/edit.component';
import {HomeComponent} from './modules/agency/component/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/agency', pathMatch: 'full' },
  { path: 'agency', component: HomeComponent },
  { path: 'agency/:id', component: EditComponent },
  { path: '**', redirectTo: '/agency', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
