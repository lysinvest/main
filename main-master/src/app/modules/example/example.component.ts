import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})

export class ExampleComponent extends FormComponent {

  constructor(injector: Injector) {
    super('example', injector);
/*    this.scripts = [
      { name: 'params/js/example.js' }
    ];*/
    this.links = [
      { name: 'Example', link: 'example' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      day: 'Day',
      week: 'Week',
      month: 'Month',
    }
  }

}

