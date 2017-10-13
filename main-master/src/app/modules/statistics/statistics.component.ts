import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
//import { Chart } from 'angular2-highcharts';
import { ItemsListService } from './items-list.service';
import { Item } from './item';

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})

export class StatisticsComponent extends FormComponent {
  public loading: boolean;
  public options: Object;
  public categories: Array<String>;
  public data: Array<number>;;
  public series: Array<any>;;
  public items: any[];
  public url: string;
  public endPoint: string = 'statistics';
  constructor(
    injector: Injector,
    public itemsListService: ItemsListService) {
    super('statistics', injector);
    this.links = [
      { name: 'Statistics', link: 'statistics' }
    ];
    this.itemsListService.setEndPoint(this.endPoint);
    this.url = this.configService.getConfig().getUrlStatistics();
    this.itemsListService.setUrl(this.url);
    this.getItems(1);

    /*    this.options = {
          type: 'column',
    
          title: {
            text: 'Files per year'
          },
    
          subtitle: {
            text: 'www.lyseo.com'
          },
    
          xAxis: {
            categories: ['2015', '2016', '2019']
          },
    
          series: [{
            type: 'column',
            colorByPoint: true,
            data: [1500, 3500, 4000],
            showInLegend: false
          }]
        }*/

  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'statistics',
    }
  }

  public getItems(type: number) {
    this.loading = true;
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    this.itemsListService.getItems(type)
      .subscribe(
      items => {
        this.items = items;
        let datatmp = new Array();
        let categoriestmp = new Array();
        let seriestmp = new Array();
        let i: number;
        if (type === 1) {
          for (i = 0; i < this.items.length; i++) {
            datatmp.push(this.items[i].number);
            categoriestmp.push(this.items[i].year);
          }
          this.data = datatmp;
          this.categories = categoriestmp;
          console.log('0001:' + JSON.stringify(this.data));
          console.log('0001:' + JSON.stringify(this.categories));
        }
        if (type === 3) {
          for (i = 0; i < this.items.length; i++) {
            datatmp.push(this.items[i].number);
            categoriestmp.push(this.items[i].year);
          }
          this.data = datatmp;
          this.categories = categoriestmp;
        }
        if (type === 2) {
          let j = 0;
          for (i = 0; i < this.items.length; i++) {
            datatmp.push(this.items[i].number);
            if (i <= 9) {
              categoriestmp.push(this.items[i].year);
            }
            if (j === 9) {
              seriestmp.push({ name: this.items[i].activity, data: datatmp });
              datatmp = [];
              j = -1;
            }
            j = j + 1;
          }
          this.categories = categoriestmp;
          this.series = seriestmp;
        }
        console.log('0003:' + type);
        this.loadChart(type);
        this.loading = false;
      });
    /*              this.categories = ['2015', '2016', '2017'];
                                      this.series = [
                                        { name: 'EA', data: [10, 20, 30] },
                                        { name: 'EM', data: [11, 21, 31] },
                                        { name: 'ER', data: [12, 22, 32] },
                                        { name: 'IA', data: [13, 23, 33] },
                                        { name: 'IM', data: [14, 24, 34] },
                                        { name: 'IR', data: [15, 25, 35] },
                                      ];*/
  }

  public onUpdate(type: number) {
    this.getItems(type);
  }

  public loadChart(type: number) {
    let title: string;
    if (type === 1) {
      title = 'Files per year';
    }
    if (type === 2) {
      title = 'Files per year/activity';
    }
    if (type === 3) {
      title = 'Revenues per year';
    }

    if (type === 2) {
      this.options = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Files per year/activity'
        },
        subtitle: {
          text: 'Source: lyseo.com'
        },
        xAxis: {
          categories: this.categories,
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'files number'
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: this.series,
      };
    }
    if (type === 1) {
      this.options = {
        title: {
          text: title
        },
        credits: {
          enabled: true
        },
        subtitle: {
          text: 'www.lyseo.com'
        },
        xAxis: {
          categories: this.categories
        },
        yAxis: {
          min: 0,
          title: {
            text: 'files number'
          }
        },
        series: [{
          type: 'column',
          colorByPoint: true,
          data: this.data,
          showInLegend: false
        }]
      }
    }
    if (type === 3) {
      this.options = {
        title: {
          text: title
        },
        credits: {
          enabled: true
        },
        subtitle: {
          text: 'www.lyseo.com'
        },
        xAxis: {
          categories: this.categories
        },
        yAxis: {
          min: 0,
          title: {
            text: 'revenues number'
          }
        },
        series: [{
          type: 'column',
          colorByPoint: true,
          data: this.data,
          showInLegend: false
        }]
      }
    }
  }

};
