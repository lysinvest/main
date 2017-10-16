import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditModule } from '../../components/edit/edit.module';
import { FormComponent } from './form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditModule,
  ],
  exports: [
    FormComponent
  ],
  declarations: [
    FormComponent,
  ],
  providers: [
  ],
})

export class ContinentFormModule { }
