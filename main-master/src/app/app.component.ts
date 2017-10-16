import { Component, Injector } from '@angular/core';
import { TransferState } from '../modules/transfer-state/transfer-state';
import { FormComponent } from './components/form/form.component';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Inject } from '@angular/core';

import '../../public/params/font-awesome/css/font-awesome.min.css';
import '../../public/assets/css/bootstrap.min.css';
import '../../public/assets/css/mdb.min.css';
import '../../public/params/css/main.css';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends FormComponent {

  public image: string = '../params/images/flags/us-1616.png';
  
  results: string[];

  public userName: string;
  public userEmail: string;
  public userConnected: boolean;
  public language: string;
  public translated: boolean;

  constructor(injector: Injector,
    private http: Http,
    private cache: TransferState) {

    super('app', injector);

    this.userName = this.sessionService.getSession().name;
    this.userEmail = this.sessionService.getSession().email;
    this.userConnected = this.sessionService.getSession().connected;
    this.language = this.sessionService.getSession().language;
    this.translated = this.sessionService.getSession().translated;
    this.scripts = [
      { name: 'assets/js/jquery-3.2.1.min.js' },
      { name: 'assets/js/popper.min.js' },
      { name: 'assets/js/bootstrap.min.js' },
      { name: 'assets/js/mdb.min.js' },
      { name: 'params/js/main.js' },
    ];
  }

  public initUi() {
    super.initUi()

    this.ui = {
      title: 'Angular 4 Project',
      name: 'seed-Invoice',
      about: 'about',
      contact: 'Contact',
      support: 'Support',
      example: 'Example',
      home: 'Home',
      logIn: 'Log In',
      dashboard: 'dashboard',
      classic: 'Classic',
      specific: '"Specific',
      search: 'search',
      profile: 'profile',
      account: 'My account',
      logOut: 'Log Out',
      language: {
        name: 'english'
      }
    }
  }

  public ngOnInit() {
    this.cache.set('cached', true);
  }

  public changeUser() {
    this.userName = this.sessionService.getSession().name;
    this.userEmail = this.userService.email;
    this.userConnected = this.sessionService.getSession().connected;
  }

  public changeLanguage() {
    this.loadTranslation();
    this.language = this.sessionService.getSession().language;
  }

  public changeTranslated() {
    this.translated = this.sessionService.getSession().translated;
  }

  public onLogOut() {
    this.userConnected = false;
    this.sessionService.getSession().setConnected(false);
    this.userService.logout();
    this.sendMessage('reloadDashboard');
    this.navigate('dashboard');
  }

}
