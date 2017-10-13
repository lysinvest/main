import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SelectComponent } from './select.component';
import { SelectRoutingModule } from './select.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SelectRoutingModule,
  ],
  exports: [
    SelectComponent
  ],
  declarations: [
    SelectComponent
  ],
})
export class SelectModule { }
