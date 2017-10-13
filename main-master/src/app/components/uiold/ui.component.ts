import { ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ConfigService } from '../../services/config/config.service';
import { Config } from '../../services/config/config';

export class UiComponent {

  public ui: any;

  public scripts: any[] = new Array<any>();
  public config: Config;

  constructor(
    public elementRef: ElementRef) {

    this.initialize();

  }

  initialize(): void {
    this.initUi();
  }

  public initUi() {
  }


}