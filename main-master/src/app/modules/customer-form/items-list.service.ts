import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ItemsListService {

  public name: string;
  public url: string;
  public endPoint: string;

  constructor(public http: Http) { }

  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });

/*  getItems(): any {
    let items;
    items = [
      {
        "number": 18470,
        "year": 2010
      },
      {
        "number": 17467,
        "year": 2011
      },
      {
        "number": 16592,
        "year": 2012
      },
      {
        "number": 14621,
        "year": 2013
      },
      {
        "number": 17660,
        "year": 2014
      },
      {
        "number": 16271,
        "year": 2015
      },
      {
        "number": 15290,
        "year": 2016
      },
      {
        "number": 3954,
        "year": 2017
      }
    ];
    return items;
  }*/

  setUrl(url: string) {
    this.url = url;
  }

  setEndPoint(endPoint: string) {
    this.endPoint = endPoint;
  }
  
  getItems(type:number,id:number): Observable<any> {
    let url = this.url + this.endPoint + '/';
    if (type === 1) {
      url = url + 'years/' + id;
    }
    if (type === 2) {
      url = url + 'activities/' + id;
    }
    if (type === 3) {
      url = url + 'revenues/' +id;
    }
    return this.http.get(url, this.options)
      .map(this.extractData)
      .catch(this.handleError);
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
