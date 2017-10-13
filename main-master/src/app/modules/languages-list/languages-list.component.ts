import { Component, Injector } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { ItemService } from '../../services/item/item.service';
import { Item } from './item';

@Component({
  selector: 'languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.css'],
})

export class LanguagesListComponent extends FormComponent {

  public title: string = 'items';
  public endpoint: string = 'languages';
  public linkRoute: string = 'item-form';
  public count: any;
  public loadedItems: Boolean;

  public page: number;
  public pageNumber: number;
  public perPage: number = 60;
  public data: any;

  items: Array<any> = new Array<any>();
  public allItems: any[];
  pagination: any = {};
  pagedItems: any[];
  pageBrowser: boolean;
  totalPagesVisible: number;

  public selectedItem: Item = new Item();
  public selectedItemtmp: Item;
  public url: string;

  //  public translationChildService: TranslationService;

  public translationSrc: any = null;
  public translationDest: any = null;

  constructor(injector: Injector,
    public paginationService: PaginationService,
    public itemListService: ItemsListService,
    public itemService: ItemService) {
    super('languages-list', injector);
    this.links = [
      { name: 'Languages', link: 'languages-list' }
    ];
    this.url = this.configService.getConfig().getUrlLanguages();
    this.loadList();
  }

  public initUi() {
    super.initUi()
    this.ui = {
      title: 'Languages List',
      search: 'search',
    }
  }

  initialize() {
    super.initialize();
    this.loadedItems = false;
    this.totalPagesVisible = 7;
    this.pageBrowser = false;
    this.page = 2;
    this.perPage = 35;
    this.pageNumber = 3;
  }

  public loadList() {
    this.itemListService.setEndPoint(this.endpoint);
    this.itemListService.setUrl(this.url);
    this.getItems(this.perPage);
  }

  public getItems(perPage: number): void {
    this.loadedItems = true;
    this.itemListService.getItems(perPage, null, null)
      .subscribe(
      items => {
//        console.log('0001:' + JSON.stringify(items));
        this.items = items;
        this.allItems = items;
        this.setPage(1, perPage);
      });
  }

  public getItemsCount(): void {
    this.itemListService.getItemsCount(null)
      .subscribe(
      itemsCount => {
        this.count = itemsCount.count;
      });
  }

  public setPage(page: number, perPage: number) {
    if (page < 1 || page > this.pagination.totalPages) {
      return;
    }
    this.pagination = this.paginationService.getPagination(this.allItems.length, page, perPage);
    this.pagedItems = this.allItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    this.pageBrowser = false;
    if (this.pagination.totalPages > this.totalPagesVisible) {
      this.pageBrowser = true;
    }
  }

  onSelectItem(item: any, id: any) {
    this.router.navigate(['/' + this.linkRoute, item.id]);
  }

  onSelect(item: any, index: number): void {
    let img: string = item.img;
    this.itemService.setEndPoint('languages');
    this.itemService.setUrl(this.url);
    this.itemService.getItem(item.id)
      .subscribe(
      items => {
        this.selectedItem = item;
        this.selectedItem.img = img;
      });
  }

  onChangeLanguage(item: Item): void {
    let language: string;
    language = this.sessionService.getSession().language;
    if (language !== item.code) {
      this.sessionService.getSession().language = item.code;
      this.sendMessage('changeLanguage');
    }
    this.previous();
  }

}





/*export class LanguageListComponent extends UiComponent {


  constructor(
    public http: Http,
    protected elementRef: ElementRef,
    protected router: Router,
    protected route: ActivatedRoute,
    protected configService: ConfigService,
    protected sessionbService: SessionbService,
    protected translationService: TranslationService,
    protected messageService: MessageService,
    public paginationService: PaginationService,
    public itemListService: ItemsListService,
    public itemService: ItemService,
    public googleTranslateService: GoogleTranslateService) {

    super('language-list',
      true,
      elementRef,
      router,
      route,
      configService,
      sessionbService,
      translationService,
      messageService);

    this.url = this.configService.getConfig().getUrl();
    this.scripts = [
      { "name": "params/js/items.js" }
    ];

  }

  initialize() {
    super.initialize();
    this.loadedItems = false;
    this.totalPagesVisible = 7;
    this.pageBrowser = false;
    this.page = 2;
    this.perPage = 15;
    this.pageNumber = 3;
  }

  afterInitialize(): void {
    super.afterInitialize();
    this.itemListService.setEndPoint(this.endpoint);
    this.itemListService.setUrl(this.url);
    this.getItems(this.perPage);
  }

  onChangeLanguage(): void {
    this.sessionb.changeLanguage();
    this.loadTranslation();
    this.sendMessage('loadTranslation');
  }

  getItems(perPage: number): void {
    this.loadedItems = true;
    this.itemListService.getItems(perPage,null)
      .subscribe(
      items => {
        this.items = items;
        this.allItems = items;
        this.setPage(1, perPage);
      });
  }

  getItemsCount(): void {
    this.itemListService.getItemsCount()
      .subscribe(
      itemsCount => {
        this.count = itemsCount.count;
      });
  }

  setPage(page: number, perPage: number) {
    if (page < 1 || page > this.pagination.totalPages) {
      return;
    }
    this.pagination = this.paginationService.getPagination(this.allItems.length, page, perPage);
    this.pagedItems = this.allItems.slice(this.pagination.startIndex, this.pagination.endIndex + 1);
    this.pageBrowser = false;
    if (this.pagination.totalPages > this.totalPagesVisible) {
      this.pageBrowser = true;
    }
  }

  onTranslate() {
    let selectedUi: any;
    this.translationChildService = new TranslationService(this.http);
    this.translationChildService.setName('about');
    this.translationChildService.setModuleType(true);
    this.translationChildService.setLanguage(this.sessionbService.getSession().getLanguage());
    this.translationChildService.getItem()
      .subscribe(
      item => {
        selectedUi = item;
        this.translationSrc = item;
        this.translationDest = item;
      });
    let res: any;
    this.googleTranslateService.setUrl(this.url);
    this.googleTranslateService.setEndPoint('translation');
    this.googleTranslateService.getItem(this.selectedItem.iso_639_1)
      .subscribe(
      item => {
        res = item;
        this.translationDest = item;
      });

  }

}*/


