import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ExampleComponent } from './example.component';
import { ExampleRoutingModule } from './example.routing.module';
import { ExampleService } from './example.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    ExampleRoutingModule,
  ],
  exports: [
    ExampleComponent
  ],
  declarations: [
    ExampleComponent
  ],
  providers: [
    ExampleService,
  ],
})

export class ExampleModule { }
