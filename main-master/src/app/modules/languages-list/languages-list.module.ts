import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { LanguagesListComponent } from './languages-list.component';
import { LanguagesListRoutingModule } from './languages-list.routing.module';

import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { ItemService } from '../../services/item/item.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LanguagesListRoutingModule,
  ],
  exports: [
    LanguagesListComponent
  ],
  declarations: [
    LanguagesListComponent
  ],
  providers: [
    ItemsListService,
    PaginationService,
    ItemService,
  ],
})
export class LanguagesListModule { }
