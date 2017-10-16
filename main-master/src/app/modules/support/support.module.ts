import { NgModule } from '@angular/core';

import { SupportComponent } from './support.component';
import { SupportRoutingModule } from './support.routing.module';

@NgModule({
  imports: [
    SupportRoutingModule
  ],
  exports: [
    SupportComponent
  ],
  declarations: [
    SupportComponent
  ],
  providers: [
  ],
})

export class SupportModule { }
