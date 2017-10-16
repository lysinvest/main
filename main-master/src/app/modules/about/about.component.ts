import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})

export class AboutComponent extends FormComponent {
  constructor(
    injector: Injector) {
    super('about', injector);
    this.links = [
      { name: 'About', link: 'about' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'About',
      software: 'Enterprise Ressource planning',
      text: {
        title: 'text title english',
        info: 'text info english'
      }
    }
  }

};
