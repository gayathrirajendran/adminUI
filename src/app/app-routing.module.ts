import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'users',
  loadChildren: () => import('./../user-dashboard/user-dashboard.module').then((m) => m.UserDashboardModule)
}, {
  path: '',
  pathMatch: 'full',
  redirectTo: 'users'
}, {
  path: '**',
  redirectTo: ''
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
