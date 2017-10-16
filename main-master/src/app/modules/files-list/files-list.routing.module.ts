import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilesListComponent } from './files-list.component';

const routes: Routes = [
  { path: '', component: FilesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesListRoutingModule { }
