import { OnInit, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Params } from '@angular/router';

import { FormComponent } from '../../components/form/form.component';
import { EditComponent } from '../../components/edit/edit.component';

import { ConfigService } from '../../services/config/config.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemService } from '../../services/item/item.service';

import { Item } from './item';

@Component({
  selector: 'file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css'],
})

export class FileFormComponent extends FormComponent {

  @ViewChild('selectedField') private selectedField: any;

  public url: string;
  public endPoint: string = 'files';

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
    public itemService: ItemService,
    public fb: FormBuilder) {
    super('file-form', injector);
    this.initForm();
  }

  public initForm() {
    this.editMode = false;
    this.scripts = [
      { name: 'params/js/items.js' },
    ];
    this.links = [
      { name: 'Files', link: 'file' }
    ];
    this.itemService.setEndPoint(this.endPoint);
    this.url = this.configService.getConfig().getUrlCustomers();
    this.itemService.setUrl(this.url);
    this.getItemById();
  }

  public afterTranslation() {
    super.afterTranslation()
    this.validationMessages = {
      id: { required: this.ui.idValidator },
      customer: { required: this.ui.customerValidator },
      number: { required: this.ui.numberValidator },
      arrival: { required: this.ui.arrivalValidator },
      arrivalDate: { required: this.ui.arrivalDateValidator },
      departure: { required: this.ui.departureValidator },
      departureDate: { required: this.ui.departureDateValidator },
    };
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'File',
      id: 'identifier',
      idValidator: 'Identifier is required.',
      customerValidator: 'customer',
      numberValidator: 'number',
      arrivalValidator: 'arrival',
      arrivalDateValidator: 'arrivalDate',
      departureValidator: 'departure',
      departureDateValidator: 'departureDate',
      customer: 'customer',
      number: 'number',
      arrival: 'arrival',
      arrivalDate: 'arrivalDate',
      departure: 'departure',
      departureDate: 'departureDate',
      formName: 'File',
    }
  }

  public createForm() {
    this.form = this.fb.group({
      id: ['', Validators.required],
      customer: ['', Validators.required],
      number: ['', Validators.required],
      arrival: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departure: ['', Validators.required],
      departureDate: ['', Validators.required],
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  public loadFormParams(): void {
    this.formErrors = {
      name: '',
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
    this.item.customer = null;
    this.item.number = null;
    this.item.arrival = null;
    this.item.arrivalDate = null;
    this.item.departure = null;
    this.item.departureDate = null;
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
      },
      error => { });
  }

  public getItemValues(item: Item): any {
    if (item.id !== undefined) {
      this.item['id'] = item['id'];
      this.item['customer'] = item['customer'];
      this.item['number'] = item['number'];
      this.item['arrival'] = item['arrival'];
      this.item['arrivalDate'] = item['arrivalDate'];
      this.item['departure'] = item['departure'];
      this.item['departureDate'] = item['departureDate'];
    } else {
      this.item['id'] = null;
      this.item['customer'] = null;
      this.item['number'] = null;
      this.item['arrival'] = null;
      this.item['arrivalDate'] = null;
      this.item['departure'] = null;
      this.item['departureDate'] = null;
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
