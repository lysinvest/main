import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemService {

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });
  public item: any;
  public url: string;
  public endPoint: string;

  constructor(
    public http: Http) {
  }

  setUrl(url: string) {
    this.url = url;
  }

  setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }

  getItem(id: number): Observable<any> {
    let res: any = {};
    if (id !== undefined) {
      res = this.http.get(this.url + this.endPoint + '/' + id, this.options)
        .map(this.extractData)
        .catch(this.handleError);
    }
    return res;
  }

  createItem(item: any): Observable<any> {
    let body = JSON.stringify(item);
    let options = new RequestOptions({ headers: this.headers });
    return this.http.post(this.url + this.endPoint, body, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  deleteItem(id: number): Observable<any> {
    let param: string = this.url + this.endPoint + '/' + id
    return this.http.delete(param, this.options)
      //      .map(() => null)
      .map(this.extractData)
      .catch(this.handleError);
  }

  updateItem(body: Object, id: number): Observable<any> {
    let bodyString = JSON.stringify(body);
    return this.http.put(this.url + this.endPoint + '/' + id, body, this.options)
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
