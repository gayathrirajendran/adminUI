import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    UserTableComponent
  ]
})
export class UserTableModule { }
