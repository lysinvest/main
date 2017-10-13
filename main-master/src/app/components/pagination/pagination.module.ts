import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PaginationComponent  } from './pagination.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    PaginationComponent
  ],
  declarations: [
    PaginationComponent
  ],
})

export class PaginationModule {
}
