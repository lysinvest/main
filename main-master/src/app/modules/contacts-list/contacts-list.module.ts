import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { ContactsListComponent } from './contacts-list.component';
import { ContactsListRoutingModule } from './contacts-list.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ContactsListRoutingModule,
  ],
  exports: [
    ContactsListComponent
  ],
  declarations: [
    ContactsListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class ContactsListModule { }
