import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { FilesListComponent } from './files-list.component';
import { FilesListRoutingModule } from './files-list.routing.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FilesListRoutingModule,
    SelectModule,
  ],
  exports: [
    FilesListComponent
  ],
  declarations: [
    FilesListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class FilesListModule { }
