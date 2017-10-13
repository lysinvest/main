import './rxjs-extensions';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { ConfigService } from './services/config/config.service';
import { SessionService } from './services/session/session.service';
import { MessageService } from './services/message/message.service';
import { PageService } from './services/page/page.service';
import { UserService } from './services/user/user.service';
import { HomeModule } from './modules/home/home.module';
import { NotFoundModule } from './modules/notfound/notfound.module';
// import {HttpClientModule} from '@angular/common/http';
// import { ORIGIN_URL } from './shared/constants/baseurl.constants';

/*export function getOriginUrl() {
  return window.location.origin;
}*/

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    //    HttpClientModule,
    AppRoutingModule,
    NotFoundModule,
    HomeModule,
  ],
  providers: [
    ConfigService,
    SessionService,
    MessageService,
    PageService,
    UserService,
/*    {
      provide: ORIGIN_URL,
      useFactory: (getOriginUrl)
    }*/
  ],
  declarations: [
    AppComponent,
  ],
  exports: [
    AppComponent
  ]
})
export class AppModule { }
