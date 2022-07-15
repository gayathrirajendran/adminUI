import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDashboardComponent } from './user-dashboard.component';
import { RouterModule } from '@angular/router';
import { UserTableModule } from '../user-table/user-table.module';
import { HttpClientModule } from '@angular/common/http';
import { PaginationModule } from '../pagination/pagination.module';
import { SearchModule } from '../search/search.module';



@NgModule({
  declarations: [
    UserDashboardComponent,
  ],
  imports: [
    RouterModule.forChild([{
      path: '',
      component: UserDashboardComponent
    }]),
    CommonModule,
    UserTableModule,
    HttpClientModule,
    PaginationModule,
    SearchModule
  ]
})
export class UserDashboardModule { }
