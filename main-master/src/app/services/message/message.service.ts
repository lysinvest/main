import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Message } from './message';

@Injectable()
export class MessageService {

  sendMessageSource = new Subject<Message>();

  getMessage(): Observable<any> {
    return this.sendMessageSource.asObservable();
  }

  sendMessage(message: Message) {
    this.sendMessageSource.next(message);
  }

  clearMessage() {
    this.sendMessageSource.next();
  }

}
