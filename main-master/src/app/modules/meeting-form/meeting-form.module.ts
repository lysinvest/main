import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditModule } from '../../components/edit/edit.module';
import { CheckBoxModule } from '../../components/checkbox/checkbox.module';

import { MeetingFormComponent } from './meeting-form.component';
import { MeetingFormRoutingModule } from './meeting-form.routing.module';

import { ItemService } from '../../services/item/item.service';
import { ItemsListService } from './items-list.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditModule,
    CheckBoxModule,
    MeetingFormRoutingModule,
  ],
  exports: [
    MeetingFormComponent
  ],
  declarations: [
    MeetingFormComponent,
  ],
  providers: [
    ItemService,
    ItemsListService,
  ],
})

export class MeetingFormModule { }
