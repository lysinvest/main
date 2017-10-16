import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Translation } from './translation';
import { SessionService } from '../../services/session/session.service';
import { Config } from '../../services/config/config';
import { Session } from '../../services/session/session';

@Injectable()
export class TranslationService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  public loaded: boolean = false;
  public name: string;
  public moduleType: boolean = true;
  public language: string = null;
  public translation: Translation = new Translation();
  public url: string;
  public endPoint: string = 'translations';

  constructor(public http: Http) {
  }

  public setTranslation(translation: Translation) {
    this.translation = translation;
  }

  public getTranslation() {
    return this.translation;
  }

  public setLoaded(loaded: boolean) {
    this.loaded = loaded;
  }

  public getLoaded() {
    return this.loaded;
  }

  public setModuleType(moduleType: boolean) {
    this.moduleType = moduleType;
  }

  public getModuleType() {
    return this.moduleType;
  }

  public setLanguage(language: string) {
    this.language = language;
  }

  public getLanguage() {
    return this.language;
  }

  public setName(name: string) {
    this.name = name;
  }

  public getName() {
    return this.name;
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public getUrl() {
    return this.url;
  }

  public setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }

  public getEndPoint() {
    return this.endPoint;
  }

  getItem(): Observable<any> {
    let url: string;
    url = this.url + this.endPoint + '/file/' + this.name + '?lang=' + this.language;
    let res: any = {};
    res = this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
    return res;
  }

  extractData(res: Response) {
    let body = res.json();
    return body;
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
