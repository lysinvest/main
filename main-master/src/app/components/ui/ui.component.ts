import { Injector } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ConfigService } from '../../services/config/config.service';
import { SessionService } from '../../services/session/session.service';
import { MessageService } from '../../services/message/message.service';
import { Message } from '../../services/message/message';
import { UserService } from '../../services/user/user.service';

export class UiComponent {

  public ui: any;
  public scripts: any[] = new Array<any>();
  public platformBrowser: boolean;
  public componentName: string = 'undefined';
  public subscription: Subscription;
  public configService: ConfigService;
  public sessionService: SessionService;
  public userService: UserService;
  public messageService: MessageService;
  public message: Message;

  constructor(componentName: string,
    injector: Injector) {
    this.componentName = componentName;
    this.configService = injector.get(ConfigService);
    this.sessionService = injector.get(SessionService);
    this.userService = injector.get(UserService);
    this.messageService = injector.get(MessageService);

    this.subscription = this.messageService.getMessage()
      .subscribe(
      message => {
        if (this.componentName !== 'undefined') {
          if (message.parent !== this.componentName) {
            if (this[message.action] !== undefined) {
              this[message.action]();
            }
          }
        }
      });
    this.initialize();
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public initialize() {
    this.platformBrowser = this.configService.getPlatformBrowser();
  }

  protected sendMessage(action: string) {
    let message: Message = new Message();
    message.setAction(action);
    message.setParent(this.componentName);
    this.messageService.sendMessage(message);
  }
}
