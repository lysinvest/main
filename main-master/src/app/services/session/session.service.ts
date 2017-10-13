import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Session } from './session';

// const production = false;
const production = true;

@Injectable()
export class SessionService {

  public loaded: boolean = false;
  public session: Session = new Session();

  constructor(public http: Http) {
    if (!this.getLoaded()) {
      let item: any;
      if (production) {
        item = {
          name: 'guest',
          firstName: 'guest',
          email: 'guest@lyseo.com',
          password: 'Trustno1',
        }
      } else {
        item = {
          name: 'guest',
          firstName: 'guest',
          email: 'guest@lyseo.com',
          password: 'Trustno1',
        }
      }
      let session: Session;
      session = this.getSession()
      session.setValue(item);
    }

  }

  public getSession() {
    return this.session;
  }

  public getLoaded() {
    return this.loaded;
  }

}
