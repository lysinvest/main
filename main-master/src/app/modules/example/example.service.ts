import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Item } from './item';

@Injectable()
export class ExampleService {

  constructor(
    private http: Http) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get('./data/json/invoices.json').map((res: Response) => res.json());
  }

}
