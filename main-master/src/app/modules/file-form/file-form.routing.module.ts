import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileFormComponent } from './file-form.component';

const routes: Routes = [
  { path: '', component: FileFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileFormRoutingModule { }
