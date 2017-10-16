import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingFormComponent } from './meeting-form.component';

const routes: Routes = [
  { path: '', component: MeetingFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingFormRoutingModule { }
