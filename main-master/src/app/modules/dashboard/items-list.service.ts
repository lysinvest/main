import { Injectable, Inject } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemsListService {

  public name: string;

  constructor() { }

  public setName(name: string) {
    this.name = name;
  }

  getItems(connected: boolean): any {
    let items;
    if (connected) {
      items = [
        {
          caption: 'Files',
          help: 'Files',
          glyph: 'fa-file-o',
          link: 'files',
          color: 'red',
        },
        {
          caption: 'Invoices',
          help: 'Invoices',
          glyph: 'fa-file-o',
          link: 'invoices',
          color: 'red',
        },
        {
          caption: 'Meetings',
          help: 'Meetings',
          glyph: 'fa-file-o',
          link: 'meetings',
          color: 'red',
        },
        {
          caption: 'Enterprises',
          help: 'Enterprises',
          glyph: 'fa-file-o',
          link: 'customers',
          color: 'red',
        },
        {
          caption: 'Contacts',
          help: 'Contacts',
          glyph: 'fa-file-o',
          link: 'contacts',
          color: 'red',
        },
        {
          caption: 'Statistics',
          help: 'Statistics',
          glyph: 'fa-file-o',
          link: 'statistics',
          color: 'red',
        },
        {
          caption: 'Continents',
          help: 'Continents',
          glyph: 'fa-file-o',
          link: 'continents',
          color: 'red',
        },
        {
          caption: 'Cities',
          help: 'Cities',
          glyph: 'fa-file-o',
          link: 'cities',
          color: 'red',
        },
      ];
    } else {
      items = [
        {
          caption: 'Cities',
          help: 'Cities',
          glyph: 'fa-file-o',
          link: 'cities',
          color: 'red',
        },
        {
          caption: 'Continents',
          help: 'Continents',
          glyph: 'fa-file-o',
          link: 'continents',
          color: 'red',
        },
        {
          caption: 'Support',
          help: 'Support',
          glyph: 'fa-dashboard',
          link: 'support',
          color: 'red',
        },
        {
          caption: 'Contact',
          help: 'Contact',
          glyph: 'fa-dashboard',
          link: 'contact',
          color: 'red',
        },
      ];

    }
    return items;
  }

}
