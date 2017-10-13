import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { EditModule } from '../../components/edit/edit.module';
import { CheckBoxModule } from '../../components/checkbox/checkbox.module';

import { CustomerFormComponent } from './customer-form.component';
import { CustomerFormRoutingModule } from './customer-form.routing.module';

import { ItemService } from '../../services/item/item.service';
import { ItemsListService } from './items-list.service';

declare var require: any;
export function highchartsFactory() {
    var hc = require('highcharts');
    var exp = require('highcharts/modules/exporting');
    exp(hc);
    return hc;
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditModule,
    CheckBoxModule,
    CustomerFormRoutingModule,
    ChartModule,
  ],
  exports: [
    CustomerFormComponent
  ],
  declarations: [
    CustomerFormComponent,
  ],
  providers: [
    ItemService,
    ItemsListService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
})

export class CustomerFormModule { }
