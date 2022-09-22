import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { DropdownComponent } from './components/dropdown/dropdown.component';
import { BaseComponent } from './components/base/base.component';
import { DialogService } from './services/dialog/dialog.service';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DropdownComponent,
    BaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule
  ],
  exports: [
    BaseComponent,
    DropdownComponent
  ],
  providers: [
    DialogService
  ]
})
export class SharedModule { }
