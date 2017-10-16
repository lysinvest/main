import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ItemsListService } from './items-list.service';
import { Item } from './item';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent extends FormComponent {

  public loading: boolean = false;
  public perPage: number;
  public items: any[];
  public connected: boolean;

  constructor(
    injector: Injector,
    public itemsListService: ItemsListService) {
    super('dashboard', injector);
    this.links = [{ name: 'Dashboard', link: 'dashboard' }];
    this.connected = this.sessionService.getSession().getConnected();
    this.getItems(this.perPage);
  }

  public initUi() {
    super.initUi()
    this.ui = {
      open: 'Open',
      title: 'Dashboard',
      model: 'Model',
      help: 'Help on'
    }
  }

  public onSelect(item: Item) {
    this.navigate(item.link);
  }

  public getItems(perPage: number): void {
    this.items = this.itemsListService.getItems(this.connected);
    this.loading = true;
  }

  public reloadDashboard(): void {
    this.connected = this.sessionService.getSession().getConnected();
    this.getItems(this.perPage);
  }

}
