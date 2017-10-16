import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemsListService {
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  public url: string;
  public endPoint: string;
  constructor(public http: Http) {
  }

  setUrl(url: string) {
    this.url = url;
  }

  setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }

  getEndPoint() {
    return this.endPoint;
  }

  getItems(perPage: number, page: number, query: any): Observable<any> {
    let limit: number;
    let offset: number;
    limit = perPage;
    offset = 0;
    if (page !== undefined) {
      offset = (page - 1) * perPage;
    }
    let filter: string = '';
    if (query !== undefined) {
      if (query !== '') {
        filter = '?' + query;
      }
    }
    if (filter !== '') {
      filter = filter + '&limit=' + limit + '&offset=' + offset;
    } else {
      filter = '?limit=' + limit + '&offset=' + offset;
    }
    let url = this.url + this.endPoint + filter;
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getItemsCount(query: any): Observable<any> {
    let filter: string = '';
    if (query !== undefined) {
      if (query !== '') {
        filter = '?' + query;
      }
    }
    let url = this.url + this.endPoint + '/count' + filter;
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateItems(body: Object): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.put(this.url + this.endPoint, body, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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

