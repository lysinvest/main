import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditModule } from '../../components/edit/edit.module';
import { CheckBoxModule } from '../../components/checkbox/checkbox.module';

import { InvoiceFormComponent } from './invoice-form.component';
import { InvoiceFormRoutingModule } from './invoice-form.routing.module';

import { ItemService } from '../../services/item/item.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditModule,
    CheckBoxModule,
    InvoiceFormRoutingModule,
  ],
  exports: [
    InvoiceFormComponent
  ],
  declarations: [
    InvoiceFormComponent,
  ],
  providers: [
    ItemService,
  ],
})

export class InvoiceFormModule { }
