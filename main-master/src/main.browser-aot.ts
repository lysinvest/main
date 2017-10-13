import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppBrowserModuleNgFactory } from '../aot/src/app/app-browser.module.ngfactory';

enableProdMode();

platformBrowser().bootstrapModuleFactory(AppBrowserModuleNgFactory);
