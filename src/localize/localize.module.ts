import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizePipe } from './localize.pipe';



@NgModule({
  declarations: [
    LocalizePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LocalizePipe
  ]
})
export class LocalizeModule { }
