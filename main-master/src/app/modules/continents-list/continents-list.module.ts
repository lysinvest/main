import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationModule } from '../../components/pagination/pagination.module';

import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';

import { ContinentsListComponent } from './continents-list.component';
import { ContinentsListRoutingModule } from './continents-list.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContinentsListRoutingModule,
    PaginationModule,
  ],
  exports: [
    ContinentsListComponent
  ],
  declarations: [
    ContinentsListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class ContinentsListModule { }
