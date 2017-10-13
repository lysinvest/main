import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Http } from '@angular/http';
import { isPlatformBrowser } from '@angular/common';
import { Config } from './config';

const production = false;
// const production = true;

@Injectable()
export class ConfigService {

  public loaded: boolean = false;
  public platformBrowser: boolean;
  public config: Config = new Config();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public http: Http) {
    if (!this.getLoaded()) {
      let item: any;
      if (production) {
        item = {
          url: 'http://api.nagathan.com/',
          urlSpecific: 'http://api.nagathan.com/',
          urlLanguages: 'http://api.nagathan.com/',
          urlTranslations: 'http://api.nagathan.com/',
          urlItems: 'http://api.nagathan.com/',
          urlLogin: 'https://www.lyseo.com/api/login',
          urlStatistics: 'https://www.lyseo.com/statistics/',
          urlCustomers: 'https://www.lyseo.com/crm/',
          urlProspects: 'https://www.lyseo.com/crm/',
        }
      } else {
        item = {
          url: 'http://api.sitarm.com/',
          // url: 'http://localhost:40000/',
          urlSpecific: 'http://api.nagathan.com/',
          // urlSpecific: 'http://localhost:40000/',
          //urlLanguages: 'http://api.sitarm.com/',
           urlLanguages: 'http://localhost:40001/',
          //urlTranslations: 'http://api.sitarm.com/',
           urlTranslations: 'http://localhost:40002/',
          // urlItems: 'http://api.sitarm.com/',
          urlItems: 'http://localhost:40003/',
          urlLogin: 'https://www.lyseo.com/api/login',
          // urlLogin: 'http://localhost:40004/api/login',
          // urlStatistics: 'https://www.lyseo.com/statistics/',
          //urlStatistics: 'http://localhost:40007/',
           urlCustomers: 'https://www.lyseo.com/crm/',
          //urlCustomers: 'http://localhost:40008/',
          urlProspects: 'https://www.lyseo.com/crm/',
          // urlProspects: 'http://localhost:40008/',
        }
      }
      let config: Config;
      config = this.getConfig()
      config.setValue(item);
    }

    this.platformBrowser = false;
    if (isPlatformBrowser(this.platformId)) {
      this.platformBrowser = true;
    }

  }

  public getPlatformBrowser() {
    return this.platformBrowser;
  }

  public getConfig() {
    return this.config;
  }

  public getLoaded() {
    return this.loaded;
  }

}
