import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})

export class SettingsComponent extends FormComponent {
  constructor(
    injector: Injector) {
    super('settings', injector);
    this.links = [
      { name: 'Settings', link: 'settings' }
    ];
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'settings',
    }
  }

};
