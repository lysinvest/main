import { Component, ElementRef, Injector, ViewChild } from '@angular/core';

import { FormComponent } from '../../components/form/form.component';

import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';


@Component({
  selector: 'contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css'],
})

export class ContactsListComponent extends FormComponent {

  @ViewChild('selectedField') private selectedField: ElementRef;

  public url: string;
  public title: string = 'Contacts';
  public endPoint: string = 'contacts';
  public linkRoute: string = 'contacts';

  public loading: Boolean = false;
  public searchField: string;
  public searchQuery: string = ''
  public resultsCounter: string;
  public resultsDuration: string;
  public resultsWarning: string;
  public resultsSearchField: string;
  public resultsFound: boolean;
  public resultsEndTime: Date;
  public resultsStartTime: Date;

  public count: number;
  public items: Array<any> = new Array<any>();
  public loadedItems: Boolean;
  public allItems: any[];
  public page: number;
  public pageNumber: number;
  public pagination: any = {};
  public pagedItems: any[];
  public pageBrowser: boolean;
  public totalPagesVisible: number;
  public perPage: number = 5;
  public offset: number = 5;
  public offsetOption: any[] = new Array<any>();

  constructor(
    injector: Injector,
    public paginationService: PaginationService,
    public itemsListService: ItemsListService) {
    super('contacts-list', injector);
    this.initForm();
  }

  public initForm() {
    this.scripts = [
      { name: 'params/js/mdb-select.js' }
    ];
    this.links = [
      { name: 'Dashboard', link: 'dashboard' },
      { name: 'contacts', link: 'contacts-list' }
    ];
    this.url = this.configService.getConfig().getUrlCustomers();
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'title',
      position: 'Position',
      id: 'id',
      idClient: 'idClient',
      date: 'Date',
      departureDate: 'ETD',
      departure: 'Departure',
      arrivalDate: 'ETA',
      arrival: 'Arrival',
      number: 'Number',
      amount: 'Amount',
      counter: 'Counter',
      name: 'Name',
      firstName: 'first Name',
      email: 'email',
      phone: 'phone',
      mobilePhone: 'mobile',
      enterprise: 'Enterprise',
      website: 'website',
      href: 'HRef',
      code: 'Code',
      actions: 'Actions',
      placeholder: 'search ...',
      results: 'Contact',
      resultsPlural: 'Contacts',
      filter: 'filter',
      resultsWarning: 'No contact matches the specified search terms',
    }
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectField();
  }

  public onCreate() {
    this.navigate(this.linkRoute, 0);
  }

  public onSelectItem(item: any, id: any) {
//    this.navigate(this.linkRoute, item.id);
  }

  public onHandleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  public onPrevious() {
    this.previous();
  }

  public selectField() {
    this.focusElement();
  }

  public focusElement() {
    if (this.platformBrowser) {
      if (this.selectedField != undefined) {
        this.selectedField.nativeElement.focus();
      }
    }
  }

  public onSearch() {
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    let query = this.searchField;
    if (query !== undefined) {
      this.searchQuery = 'q=' + this.searchField;
    }
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public initialize() {
    super.initialize();
    this.initializePagination();
  }

  public afterInitialize(): void {
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public getItems(perPage: number, page: number, query: any): void {
    this.loadedItems = true;
    this.itemsListService.getItems(perPage, page, query)
      .subscribe(
      items => {
        this.items = items;
        this.allItems = items;
        this.resultsEndTime = new Date();
        this.setActivePage(page, perPage);
        let duration =  (this.resultsEndTime.getTime() - this.resultsStartTime.getTime()) / 1000;
        this.resultsDuration ='(' + duration + ' ms )';
        this.loading = false;
      });
  }

  public getItemsCount(query: any): void {
    this.resultsStartTime = new Date();
    this.loading = true;
    this.itemsListService.getItemsCount(query)
      .subscribe(
      itemsCount => {
        this.count = itemsCount.count;
        this.resultsFound = false;
        if (this.count > 0) {
          this.resultsFound = true;
          this.resultsWarning = '';
          this.resultsSearchField = '';
        } else {
          this.resultsSearchField = '';
          if (this.searchField != undefined) {
            this.resultsSearchField = '( ' + this.searchField + ' )';
          }
          this.resultsWarning = this.ui.resultsWarning;
        }
        if (this.count > 1) {
          this.resultsCounter = this.count + ' ' + this.ui.resultsPlural;
        } else {
          this.resultsCounter = this.count + ' ' + this.ui.results;
        }
      });
  }

  public initializePagination() {
    this.offsetOption = [
      { 'code': 'All', 'value': 0 },
      { 'code': '5', 'value': 5 },
      { 'code': '10', 'value': 10 },
      { 'code': '20', 'value': 20 },
      { 'code': '50', 'value': 50 },
      { 'code': '100', 'value': 100 }
    ];
    this.loadedItems = false;
    this.totalPagesVisible = 7;
    this.pageBrowser = false;
    this.page = 2;
    this.pageNumber = 1;
  }

  public onSelectPerPage(perPage: number) {
    this.offset = perPage;
    this.perPage = perPage;
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public setPage(page: number, perPage: number) {
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, page, this.searchQuery);
  }

  public setActivePage(page: number, perPage: number) {
    this.pagination = this.paginationService.getPagination(this.count, page, perPage);
    this.pagedItems = this.allItems.slice(0, perPage);
    this.pageBrowser = false;
    if (this.pagination.totalPages > this.totalPagesVisible) {
      this.pageBrowser = true;
    }
  }

}

