import { Injectable, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from '../../services/config/config.service';

@Injectable()
export class UserService {
  public platformBrowser: boolean = false;
  public logged: boolean = false;
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public url: string;
  public headers = new Headers({ 'Content-Type': 'application/json' });
  public options = new RequestOptions({ headers: this.headers });

  constructor(
    public configService: ConfigService,
    public http: Http,
    public router: Router) {
    this.url = configService.getConfig().getUrlLogin();
    this.platformBrowser = this.configService.getPlatformBrowser();
    this.resetUser();
    if (this.platformBrowser) {
      let token = localStorage.getItem('token');
      if (token) {
        this.session(token).subscribe(res => {
          if (res) {
            this.firstName = res.PRENOM;
            this.lastName = res.NOM;
            this.email = res.EMAIL;
            this.logged = true;
          }
        })
      }
    }
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public resetUser() {
    this.firstName = 'john';
    this.lastName = 'doe';
    this.email = 'johndoe@lyseo.com';
  }

  public canActivate() {
    if (this.logged) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  public login(item: any): Observable<any> {
    const data = JSON.stringify(item);
    return this.http.post(this.url, data, this.options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private session(token: string): Observable<any> {
    let headers = new Headers();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public logout() {
    localStorage.removeItem('token');
    this.logged = false;
    this.resetUser();
    this.router.navigate(['/']);
  }

  public extractData(res: Response) {
    const body = res.json();
    return body;
  }

  public handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
