import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { InvoicesListComponent } from './invoices-list.component';
import { InvoicesListRoutingModule } from './invoices-list.routing.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InvoicesListRoutingModule,
    SelectModule,
  ],
  exports: [
    InvoicesListComponent
  ],
  declarations: [
    InvoicesListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class InvoicesListModule { }
