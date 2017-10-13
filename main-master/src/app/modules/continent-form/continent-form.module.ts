import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditModule } from '../../components/edit/edit.module';
import { CheckBoxModule } from '../../components/checkbox/checkbox.module';

import { ItemService } from '../../services/item/item.service';

import { ContinentFormComponent } from './continent-form.component';
import { ContinentFormRoutingModule } from './continent-form.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ContinentFormRoutingModule,
    EditModule,
    CheckBoxModule,
  ],
  exports: [
    ContinentFormComponent
  ],
  declarations: [
    ContinentFormComponent,
  ],
  providers: [
    ItemService,
  ],
})

export class ContinentFormModule { }
