import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContinentFormComponent } from './continent-form.component';

const routes: Routes = [
  { path: '', component: ContinentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContinentFormRoutingModule { }
