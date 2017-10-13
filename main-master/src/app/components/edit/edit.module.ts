import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EditComponent  } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    EditComponent
  ],
  declarations: [
    EditComponent
  ],
})

export class EditModule {
}
