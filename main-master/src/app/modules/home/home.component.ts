import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent extends FormComponent {
  constructor(
    injector: Injector) {
    super('home', injector);
    this.pageService.links = [];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      crm: 'Customer relationship management',
      learn: 'Learn more',
      analytics: {
        name: 'Statistics',
        text: 'Documentation about Statistics'
      },
      customization: {
        name: 'Customization',
        text: 'Documentation about Customization'
      },
      support: {
        name: 'Support',
        text: 'Documentation about Support'
      },
      contact: {
        name: 'Contact',
        text: 'Documentation about Contact'
      }
    }
  }

}
