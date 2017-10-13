import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css'],
})

export class NotFoundComponent extends FormComponent {
  constructor(injector: Injector) {
    super('login', injector);
    this.links = [
      { name: 'not found', link: 'notfound' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'not found',
    }
  }

}
