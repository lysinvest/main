import { Output, OnInit, EventEmitter, Inject, Component, ElementRef, Injector, ViewChild } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { FormComponent } from '../../components/form/form.component';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ConfigService } from '../../services/config/config.service';
import { ItemsListService } from '../../services/items-list/items-list.service';

@Component({
  selector: 'prospects-list',
  templateUrl: './prospects-list.component.html',
  styleUrls: ['./prospects-list.component.css'],
})

export class ProspectsListComponent extends FormComponent {

  @ViewChild('selectedField') private selectedField: ElementRef;
  @Output() backed: EventEmitter<any> = new EventEmitter<any>();
  public loading: Boolean = false;
  public searchField: string;
  public results: string;
  public resultsDuration: number;
  public resultsWarning: string;
  public resultsActive: boolean = false;
  public platformBrowser: boolean;
  public url: string;
  public title: string = 'Customers';
  public endPoint: string = 'prospects';
  public linkRoute: string = 'continent-form';
  public count: number;
  public loadedItems: Boolean;
  public page: number;
  public pageNumber: number;
  public data: any;
  public query: string = ''
  public allItems: any[];
  public items: Array<any> = new Array<any>();
  public pagination: any = {};
  public pagedItems: any[];
  public pageBrowser: boolean;
  public totalPagesVisible: number;
  public perPage: number = 10;
  public offset: number = 10;
  public offsetOption: any[] = new Array<any>();
  public endTime: Date;
  public startTime: Date;

  constructor(
    injector: Injector,
    public location: Location,
    public paginationService: PaginationService,
    public itemListService: ItemsListService) {
    super('prospects-list', injector);
    this.links = [
      { name: 'Dashboard', link: 'dashboard' },
      { name: 'Prospects', link: 'prospects-list' }
    ];
    this.configService = injector.get(ConfigService);
    this.url = this.configService.getConfig().getUrlProspects();
    this.resultsActive = false;
    this.platformBrowser = this.configService.getPlatformBrowser();
    this.itemListService.setEndPoint(this.endPoint);
    this.itemListService.setUrl(this.url);
    this.startTime = new Date();
    this.getItemsCount(this.query);
    this.getItems(this.perPage, this.pageNumber, this.query);
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'title',
      number: 'N°',
      position: 'Position',
      id: 'id',
      counter: 'Counter',
      name: 'Name',
      email: 'email',
      phone: 'phone',
      website: 'website',
      href: 'HRef',
      code: 'Code',
      actions: 'Actions',
      placeholder: 'prospect ...',
      filter: 'filter',
      results: 'results',
    }
  }

  public onCreate() {
    //    let route: string = 'continent-form';
    //    this.router.navigate(['/' + route, 0]);
  }

  public ngAfterViewInit() {
    super.ngAfterViewInit();
    this.selectField();
  }

  public handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.onSearch();
    }
  }

  public goBack() {
    this.location.back();
  }

  public selectField() {
    if (this.platformBrowser) {
      this.selectedField.nativeElement.focus();
      //      this.renderer.selectRootElement('#selectedField').focus()
      //      .setStyle(element.nativeElement, 'font-size', 'x-large');
    }
  }

  public onSearch() {
    this.itemListService.setEndPoint(this.endPoint);
    this.itemListService.setUrl(this.url);
    let q = this.searchField;
    if (q !== undefined) {
      this.query = 'q=' + this.searchField;
    }
    this.getItemsCount(this.query);
    this.getItems(this.perPage, this.pageNumber, this.query);
  }

  public initialize() {
    super.initialize();
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

  /*  afterInitialize(): void {
      super.afterInitialize();
      this.itemListService.setEndpoint(this.endpoint);
      this.itemListService.setUrl(this.url);
      this.getItemsCount(this.query);
      this.getItems(this.perPage, this.pageNumber, this.query);
    }*/

  /*  onChangeLanguage(): void {
      this.session.changeLanguage();
      this.loadTranslation();
      this.sendMessage('loadTranslation');
    }*/

  onSelectPerPage(perPage: number) {
    this.offset = perPage;
    this.perPage = perPage;
    this.getItemsCount(this.query);
    this.getItems(this.perPage, this.pageNumber, this.query);
  }

  getItems(perPage: number, page: number, query: any): void {
    this.loadedItems = true;
    this.itemListService.getItems(perPage, page, query)
      .subscribe(
      items => {
        this.items = items;
        this.allItems = items;
        this.endTime = new Date();
        this.setActivePage(page, perPage);
        this.resultsDuration = (this.endTime.getTime() - this.startTime.getTime()) / 1000;
        this.loading = false;
      });
  }

  getItemsCount(query: any): void {
    this.loading = true;
    this.itemListService.getItemsCount(query)
      .subscribe(
      itemsCount => {
        this.count = itemsCount.count;
        this.results = this.count + ' ' + this.ui.results;
        this.resultsActive = false;
        if (this.count > 0) {
          this.resultsActive = true;
          this.resultsWarning = '';
        } else {
          this.resultsWarning = 'Aucun resultat';
        }
      });
  }

  onSelectItem(item: any, id: any) {
    //    let route: string = 'continent-form';
    //    this.router.navigate(['/' + route, item.id]);
  }

  onSelectItemApi(item: any, id: any) {
    //  this.router.navigate(['/' + this.linkRoute, item.id]);
  }

  public setPage(page: number, perPage: number) {
    this.getItemsCount(this.query);
    this.getItems(this.perPage, page, this.query);
  }

  public setActivePage(page: number, perPage: number) {
    /*    if (page < 1 || page > this.pagination.totalPages) {
          return;
        }*/
    this.pagination = this.paginationService.getPagination(this.count, page, perPage);
    //    this.pagedItems = this.allItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    this.pagedItems = this.allItems.slice(0, perPage);
    this.pageBrowser = false;
    if (this.pagination.totalPages > this.totalPagesVisible) {
      this.pageBrowser = true;
    }
  }

}

