import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationService } from '../../services/pagination/pagination.service';
import { ItemsListService } from '../../services/items-list/items-list.service';
import { MeetingsListComponent } from './meetings-list.component';
import { MeetingsListRoutingModule } from './meetings-list.routing.module';
import { SelectModule } from '../../components/select/select.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MeetingsListRoutingModule,
    SelectModule,
  ],
  exports: [
    MeetingsListComponent
  ],
  declarations: [
    MeetingsListComponent,
  ],
  providers: [
    ItemsListService,
    PaginationService,
  ],
})
export class MeetingsListModule { }
