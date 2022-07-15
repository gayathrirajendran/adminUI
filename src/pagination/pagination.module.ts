import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import { LocalizeModule } from "../localize/localize.module";



@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    LocalizeModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
