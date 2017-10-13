import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';

import { ProspectsListComponent } from './prospects-list.component';
import { ProspectsListRoutingModule } from './prospects-list.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProspectsListRoutingModule,
  ],
  exports: [
    ProspectsListComponent
  ],
  declarations: [
    ProspectsListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})

export class ProspectsListModule { }
