import 'zone.js/dist/zone';
import 'reflect-metadata';
import 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppBrowserModule } from './app/app-browser.module';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppBrowserModule);
