import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingsListComponent } from './meetings-list.component';

const routes: Routes = [
  { path: '', component: MeetingsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingsListRoutingModule { }
