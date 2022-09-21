import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { BaseComponent } from './components/base/base.component';

@NgModule({
  declarations: [
    DropdownComponent,
    BaseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BaseComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
