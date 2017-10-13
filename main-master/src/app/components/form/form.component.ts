import { ElementRef, Injector } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { UiComponent } from '../../components/ui/ui.component';

import { TranslationService } from '../../services/translation/translation.service';
import { PageService } from '../../services/page/page.service';
import { Link } from '../../services/page/link';

export class FormComponent extends UiComponent {

  public scripts: any[] = new Array<any>();
  public links: any[] = new Array<any>();
  public language: string = null;
  public elementRef: ElementRef;
  public router: Router;
  public route: ActivatedRoute;
  public location: Location;
  public translationService: TranslationService;
  public pageService: PageService;

  constructor(componentName: string,
    injector: Injector) {
    super(componentName, injector);
    //    this.translationService = new TranslationService(this.http);
    this.translationService = injector.get(TranslationService);
    this.elementRef = injector.get(ElementRef);
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
    this.location = injector.get(Location);
    this.pageService = injector.get(PageService);
    this.loadTranslation();
  }

  public initialize() {
    super.initialize();
    this.initUi();
  }

  public initUi() {
  }

  public afterTranslation() {
  }

  public loadTranslation() {
    let load: boolean;
    let translated = false;
    this.sessionService.getSession().translated = translated;
    let sessionLanguage: string;
    let translationLanguage: string;
    sessionLanguage = this.sessionService.getSession().language;
    translationLanguage = this.translationService.getLanguage();
    load = false;
    if (sessionLanguage == null) {
      sessionLanguage = 'en';
      this.sessionService.getSession().language = sessionLanguage;
    }
    if (this.language == null) {
      if (sessionLanguage !== 'en') {
        load = true;
      }
    } else {
      load = true;
    }
    if (load) {
      this.translationService.setUrl(this.configService.getConfig().getUrlTranslations());
      this.translationService.setName(this.componentName);
      this.translationService.setLanguage(sessionLanguage);
      this.translationService.getItem()
        .subscribe(
        item => {
          if (item.status !== 'error') {
            this.ui = item;
            translated = true;
          } else {
            translated = false;
          }
          this.sessionService.getSession().translated = translated;
          this.sendMessage('changeTranslated');
          this.afterTranslation();
        },
        err => {
        });
      this.sessionService.getSession().translated = translated;
    } else {
      translated = true;
      this.sessionService.getSession().translated = translated;
      this.afterTranslation();
    }
    this.sendMessage('changeTranslated');
    this.translationService.setLanguage(sessionLanguage);
    this.language = sessionLanguage;
  }

  public ngAfterViewInit() {
    if (this.scripts.length > 0) {
      for (let i = 0; i < this.scripts.length; i++) {
        this.loadScripts(this.scripts[i].name);
      }
    }
    if (this.links.length > 0) {
      this.loadLinks();
    }
  }

  public loadLinks(): void {
    this.pageService.links = [];
    let first: number;
    let last: number;
    last = this.links.length - 1;
    if (this.links.length > 0) {
      this.pageService.links.push(new Link(['/'], 'Home'));
      for (let i = 0; i < this.links.length; i++) {
        if (i === last) {
          this.pageService.links.push(new Link(['/', this.links[i].link], this.links[i].name, true));
        } else {
          this.pageService.links.push(new Link(['/' + this.links[i].link], this.links[i].name));
        }
      }
    }
    /*    this.pageService.links = [
          new Link(['/'], 'Home'),
          new Link(['/dashboard'], 'Dashboard'),
          new Link(['/', 'prospects-list'], 'Prospects', true)
        ]; */
    /*    this.pageService.links = [
          new Link(['/'], 'Home'),
          new Link(['/', 'example'], 'Example', true)
        ];*/
  }

  public loadScripts(name: string): void {
    if (this.platformBrowser) {
      let s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = name;
      s.async = false;
      this.elementRef.nativeElement.appendChild(s);
    }
  }

  public navigate(link: string, id?: number): void {
    if ((id == undefined) || (id == null)) {
      this.router.navigate(['/' + link]);
    } else {
      this.router.navigate(['/' + link, id]);
    }
  }

  public previous() {
    this.location.back();
  }

}
