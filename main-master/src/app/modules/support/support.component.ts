import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css'],
})

export class SupportComponent extends FormComponent {
  constructor(
    injector: Injector) {
    super('support', injector);
    this.scripts = [
      { name: 'params/js/support.js' }
    ];
    this.links = [
      { name: 'Support', link: 'support' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'Support Tickets',
      search: 'search ...',
      name: 'Name',
      object: 'Object',
    }
  }

};
