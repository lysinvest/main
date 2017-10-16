import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditModule } from '../../components/edit/edit.module';
import { CheckBoxModule } from '../../components/checkbox/checkbox.module';

import { FileFormComponent } from './file-form.component';
import { FileFormRoutingModule } from './file-form.routing.module';

import { ItemService } from '../../services/item/item.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditModule,
    CheckBoxModule,
    FileFormRoutingModule,
  ],
  exports: [
    FileFormComponent
  ],
  declarations: [
    FileFormComponent,
  ],
  providers: [
    ItemService,
  ],
})

export class FileFormModule { }
