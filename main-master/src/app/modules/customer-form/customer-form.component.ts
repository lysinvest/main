import { AfterViewInit, Inject, OnInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Params } from '@angular/router';

import { FormComponent } from '../../components/form/form.component';
import { EditComponent } from '../../components/edit/edit.component';

import { ConfigService } from '../../services/config/config.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemService } from '../../services/item/item.service';
import { ItemsListService } from './items-list.service';

import { Item } from './item';

@Component({
  selector: 'customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})

export class CustomerFormComponent extends FormComponent {

  @ViewChild('selectedField') private selectedField: any;

  public url: string;
  public endPoint: string = 'customers';

  public item: Item = new Item();
  public form: FormGroup;
  public formErrors: any;
  public validationMessages: any;
  public editMode: boolean;

  public loading: boolean;
  public options: Object;
  public categories: Array<String>;
  public data: Array<number>;;
  public series: Array<any>;;
  public items: any[];

  constructor(
    injector: Injector,
    public itemsListService: ItemsListService,
    public itemService: ItemService,
    public fb: FormBuilder) {

    super('customer-form', injector);

    this.initForm();
  }

  public initForm() {
    this.editMode = false;

    this.scripts = [
      { name: 'params/js/items.js' }
    ];
    this.links = [
      { name: 'Customer', link: 'customer' }
    ];

    this.itemService.setEndPoint(this.endPoint);
    this.url = this.configService.getConfig().getUrlCustomers();
    this.itemService.setUrl(this.url);
    this.getItemById();
  }

  public getItems(type: number) {
    this.loading = true;
    this.itemsListService.setEndPoint('statistics');
    this.itemsListService.setUrl(this.configService.getConfig().getUrlStatistics());
      this.itemsListService.getItems(type, this.item.idClient)
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
          this.loadChart(type);
          this.loading = false;
        });
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

  public afterTranslation() {
    super.afterTranslation()
    this.validationMessages = {
      id: { required: this.ui.idValidator },
      idClient: { required: this.ui.idClientValidator },
      name: { required: this.ui.nameValidator },
      email: { required: this.ui.emailValidator },
      phone: { required: this.ui.phoneValidator },
      webSite: { required: this.ui.webSiteValidator },
    };
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'Continent',
      id: 'identifier',
      idClient: 'idClient',
      counter: 'counter',
      name: 'Name',
      email: 'Email',
      phone: 'phone',
      webSite: 'Web site',
      idValidator: 'Identifier is required.',
      idClientValidator: 'idClient is required.',
      nameValidator: 'Name is required.',
      emailValidator: 'Email is required.',
      phoneValidator: 'Phone is required.',
      webSiteValidator: 'webSite is required.',
      formName: 'customer',
    }
  }

  public createForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      idClient: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      webSite: ['', Validators.required],
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  public loadFormParams(): void {
    this.formErrors = {
      //      id: '',
      name: '',
      //      code: '',
    };
  };

  public onPrevious() {
    this.previous();
  }

  public ngOnInit() {
    this.createForm();
    this.loadFormParams();
  }

  public newItem() {
    this.resetForm();
  }

  public resetForm() {
    this.item.id = null;
    this.item.idClient = null;
    this.item.name = null;
    this.item.email = null;
    this.item.phone = null;
    this.item.webSite = null;
  }

  public onChangeMode() {
    this.editMode = !this.editMode;
  }

  public onList() {
    this.navigate('customers-list');
  }

  public focusElement() {
    /*    if (this.platformBrowser) {
          if (this.selectedField != undefined) {
            this.selectedField.nativeElement.focus();
          }
        }*/
  }

  public onCreate() {
    this.newItem();
    this.form.setValue(this.item);
    this.focusElement();
  }

  public onUpdate() {
    this.focusElement();
    this.item = this.form.value;
    const form = this.form;
    let valid_form: boolean = true;
    let formControl: AbstractControl;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      formControl = form.controls[field];
      if ((formControl.value === null) || (control && control.dirty && !control.valid)) {
        valid_form = false;
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
    if (valid_form === true) {
      let control_pk: AbstractControl;
      control_pk = form.controls['id'];
      if (control_pk.value === null) {
        this.createItem(this.ignoreItemValues(this.item));
      } else {
        this.updateItem(this.item, control_pk.value);
      }
    }
  }

  public onDelete() {
    this.deleteItem(this.item.id);
    this.focusElement();
  }

  public onValueChanged(data?: any) {
    if (!this.form) { return; }
    const form = this.form;
    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  public getItemById(): void {
    this.route.params
      .subscribe(
      params => {
        if (params['id'] !== undefined) {
          this.getItem(params['id']);
        }
      });
  }

  public getItem(id: number): void {
    this.itemService.getItem(id)
      .subscribe(
      item => {
        this.getItemValues(item);
        this.form.setValue(this.item);
        this.getItems(1);
      },
      error => { });
  }

  public getItemValues(item: Item): any {
    if (item.id !== undefined) {
      this.item['id'] = item['id'];
      this.item['idClient'] = item['idClient'];
      this.item['name'] = item['name'];
      this.item['email'] = item['email'];
      this.item['phone'] = item['phone'];
      this.item['webSite'] = item['webSite'];
    } else {
      this.item['id'] = null;
      this.item['idClient'] = null;
      this.item['name'] = null;
      this.item['email'] = null;
      this.item['phone'] = null;
      this.item['webSite'] = null;
    }
  }

  public ignoreItemValues(item: Item): any {
    let res: any;
    res = item;
    delete res.c_date;
    delete res.u_date;
    return res;
  }

  public createItem(item: Item) {
    this.itemService.createItem(item)
      .subscribe(
      data => {
        this.getItemValues(data);
        this.form.setValue(this.item);
      },
      error => { });
  }

  public updateItem(item: Item, id: number) {
    this.itemService.updateItem(item, id)
      .subscribe(
      data => {
        this.getItemValues(data);
        this.form.setValue(this.item);
      },
      error => { });
  }

  public deleteItem(id: number) {
    this.itemService.deleteItem(id)
      .subscribe(
      item => {
        this.getItemValues(item);
        this.form.setValue(this.item);
      },
      error => { });
  }

}
