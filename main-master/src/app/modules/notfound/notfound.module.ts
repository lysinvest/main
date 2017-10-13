import { NgModule } from '@angular/core';
import { NotFoundComponent } from './notfound.component';
import { NotFoundRoutingModule } from './notfound.routing.module';

@NgModule({
  imports: [
    NotFoundRoutingModule
  ],
  exports: [
    NotFoundComponent
  ],
  declarations: [
    NotFoundComponent
  ],
  providers: [],
})
export class NotFoundModule { }
