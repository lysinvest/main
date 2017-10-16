import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})

export class ContactComponent extends FormComponent {
  constructor(
    injector: Injector) {
    super('contact', injector);
    this.links = [
      {name: 'Contact', link: 'contact' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'Contact',
    }
  }

};
