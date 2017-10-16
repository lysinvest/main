import { NgModule } from '@angular/core';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutingModule } from './statistics.routing.module';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
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
    StatisticsRoutingModule,
    ChartModule,
  ],
  exports: [
    StatisticsComponent
  ],
  declarations: [
    StatisticsComponent
  ],
  providers: [
    ItemsListService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ]
})

export class StatisticsModule { }
