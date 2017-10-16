import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoiceFormComponent } from './invoice-form.component';

const routes: Routes = [
  { path: '', component: InvoiceFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceFormRoutingModule { }
