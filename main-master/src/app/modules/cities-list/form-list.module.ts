import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { FormListComponent } from './form-list.component';
import { FormListRoutingModule } from './form-list.routing.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FormListRoutingModule,
    SelectModule,
  ],
  exports: [
    FormListComponent
  ],
  declarations: [
    FormListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class FormListModule { }
