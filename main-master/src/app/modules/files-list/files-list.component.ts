import { Component, ElementRef, Injector, ViewChild } from '@angular/core';

import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { FormComponent } from '../../components/form/form.component';
import { SelectModel } from '../../components/select/select.model';

import { FormList } from './form-list';

declare const $: any;

@Component({
  selector: 'files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
})

export class FilesListComponent extends FormComponent {

  @ViewChild('selectedField') private selectedField: ElementRef;

  public formList: FormList = new FormList();
  public url: string;
  public title: string;
  public endPoint: string;
  public linkRoute: string;

  public loading: Boolean = false;
  public searchField: string;
  public searchQuery: string;
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
  public perPage: number;
  public offset: number;
  public offsetOption: any[] = new Array<any>();

  public selectModelDate: SelectModel = new SelectModel();;
  public selectedDate: number;
  public customizedDate: boolean;
  public selectModelRow: SelectModel = new SelectModel();;
  public selectedRow: number;
  public positionDisplayed: boolean;
  public numberDisplayed: boolean;
  public paginationDisplayed: boolean;

  constructor(
    injector: Injector,
    public paginationService: PaginationService,
    public itemsListService: ItemsListService) {
    super('files-list', injector);
    this.initForm();
  }

  public initForm() {
    this.title = this.formList.title;
    this.endPoint = this.formList.endPoint;
    this.linkRoute = this.formList.linkRoute;
    this.selectedDate = this.formList.selectedDate;
    this.selectedRow = this.formList.selectedRow;
    this.perPage = this.formList.perPage;
    this.offset = this.formList.offset;
    this.totalPagesVisible = this.formList.totalPagesVisible;
    this.scripts = [
      { name: 'params/js/datepicker.js' }
    ];
    this.positionDisplayed = false;
    this.numberDisplayed = false;
    this.paginationDisplayed = false;
    this.customizedDate = false;
    this.selectModelDate.value = this.selectedDate;
    this.selectModelDate.options = [
      { value: 1, label: 'any date' },
      { value: 2, label: 'Less than 24 hours' },
      { value: 3, label: 'less than a week' },
      { value: 4, label: 'less than a month' },
      { value: 5, label: 'less than a year' },
      { value: 6, label: 'customized date' },
    ];
    this.selectModelRow.value = this.selectedRow;
    this.selectModelRow.options = [
      { value: 1, label: '5 rows' },
      { value: 2, label: '10 rows' },
      { value: 3, label: '20 rows' },
      { value: 4, label: '50 rows' },
      { value: 5, label: '100 rows' },
      { value: 6, label: 'Infinite' },
    ];
    this.url = this.configService.getConfig().getUrlCustomers();
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    this.formatquery();
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public initUi() {
    super.initUi()
    this.ui = {
      position: 'Position',
      date: 'Date',
      departureDate: 'ETD',
      departure: 'Departure',
      arrivalDate: 'ETA',
      arrival: 'Arrival',
      number: 'N°',
      fileNumber: 'File Number',
      name: 'Customer',
      placeholder: 'search ...',
      results: 'File',
      resultsPlural: 'Files',
      filter: 'filter',
      resultsWarning: 'No file matches the specified search terms',
    }
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
    //    this.selectField();
  }

  public onCreate() {
    this.navigate(this.linkRoute, 0);
  }

  public onSelectItem(item: any, id: any) {
    this.navigate(this.linkRoute, item.id);
  }

  public onHandleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  public onPrevious() {
    this.previous();
  }

  public onChangeSelectDate(event: any) {
    this.selectedDate = event;
    if (event == 6) {
      this.customizedDate = true;
    } else {
      this.customizedDate = false;
    }
    this.onSelectPerPage(this.perPage);
  }

  public onChangeSelectRow(event: any) {
    this.selectedRow = event;
    let perPage: number;
    perPage = 5;
    if (this.selectedRow == 1) { perPage = 5; }
    if (this.selectedRow == 2) { perPage = 10; }
    if (this.selectedRow == 3) { perPage = 20; }
    if (this.selectedRow == 4) { perPage = 50; }
    if (this.selectedRow == 5) { perPage = 100; }
    this.onSelectPerPage(perPage);
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

  public formatquery() {
    let query = this.searchField;
    let sql: string = null;
    if (query !== undefined) {
      sql = 'q=' + this.searchField;
    }
    if (this.selectedDate !== undefined) {
      if (sql != null) {
        sql = sql + '&datetype=' + this.selectedDate;
      } else {
        sql = 'datetype=' + this.selectedDate;
      }
    }
    this.searchQuery = sql;
  }

  public collapse(show: boolean) {
    if (show) {
      $('#collapseFilter').collapse('show');
    }
    if (!show) {
      $('#collapseFilter').collapse('hide');
    }
  }

  public onSearch() {
    this.search();
  }

  public search() {
    this.collapse(false);
    this.itemsListService.setEndPoint(this.endPoint);
    this.itemsListService.setUrl(this.url);
    this.formatquery();
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
    this.formatquery();
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
        let duration = (this.resultsEndTime.getTime() - this.resultsStartTime.getTime()) / 1000;
        this.resultsDuration = '(' + duration + ' ms )';
        this.loading = false;
      });
  }

  public getItemsCount(query: any): void {
    this.resultsStartTime = new Date();
    this.loading = true;
    this.resultsDuration = '';
    this.resultsCounter = '';
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
    this.pageBrowser = false;
    this.pageNumber = 1;
    //    this.totalPagesVisible = 7;
//    this.page = 2;
  }

/*  public selectPerPage(perPage: number) {
    this.selectPerPage(perPage);
  }*/

  public onSelectPerPage(perPage: number) {
    this.offset = perPage;
    this.perPage = perPage;
    this.formatquery();
    this.getItemsCount(this.searchQuery);
    this.getItems(this.perPage, this.pageNumber, this.searchQuery);
  }

  public setPage(page: number, perPage: number) {
    this.formatquery();
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

