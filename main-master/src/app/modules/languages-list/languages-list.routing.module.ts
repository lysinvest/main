import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanguagesListComponent } from './languages-list.component';

const routes: Routes = [
  { path: '', component: LanguagesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanguagesListRoutingModule { }
