import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicesListComponent } from './invoices-list.component';

const routes: Routes = [
  { path: '', component: InvoicesListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoicesListRoutingModule { }
