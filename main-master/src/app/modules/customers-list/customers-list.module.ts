import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { CustomersListComponent } from './customers-list.component';
import { CustomersListRoutingModule } from './customers-list.routing.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomersListRoutingModule,
    SelectModule,
  ],
  exports: [
    CustomersListComponent
  ],
  declarations: [
    CustomersListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class CustomersListModule { }
