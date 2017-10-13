import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { NotFoundComponent } from './modules/notfound/notfound.component';

const routes: Routes = [
  // specific
  { path: 'cities', loadChildren: './modules/cities-list/form-list.module#FormListModule' },
  { path: 'meetings', loadChildren: './modules/meetings-list/meetings-list.module#MeetingsListModule' },
  { path: 'meetings/:id', loadChildren: './modules/meeting-form/meeting-form.module#MeetingFormModule' },
  { path: 'contacts', loadChildren: './modules/contacts-list/contacts-list.module#ContactsListModule' },
  { path: 'files/:id', loadChildren: './modules/file-form/file-form.module#FileFormModule' },
  { path: 'files', loadChildren: './modules/files-list/files-list.module#FilesListModule' },
  { path: 'invoices', loadChildren: './modules/invoices-list/invoices-list.module#InvoicesListModule' },
  { path: 'invoices/:id', loadChildren: './modules/invoice-form/invoice-form.module#InvoiceFormModule' },
  { path: 'customers', loadChildren: './modules/customers-list/customers-list.module#CustomersListModule' },
  { path: 'customers/:id', loadChildren: './modules/customer-form/customer-form.module#CustomerFormModule' },
  { path: 'continents', loadChildren: './modules/continents-list/continents-list.module#ContinentsListModule' },
  { path: 'continents/:id', loadChildren: './modules/continent-form/continent-form.module#ContinentFormModule' },
  { path: 'prospects', loadChildren: './modules/prospects-list/prospects-list.module#ProspectsListModule' },
  { path: 'statistics', loadChildren: './modules/statistics/statistics.module#StatisticsModule' },
  // standard
  { path: 'languages', loadChildren: './modules/languages-list/languages-list.module#LanguagesListModule' },
  { path: 'about', loadChildren: './modules/about/about.module#AboutModule' },
  { path: 'example', loadChildren: './modules/example/example.module#ExampleModule' },
  { path: 'settings', loadChildren: './modules/settings/settings.module#SettingsModule' },
  { path: 'support', loadChildren: './modules/support/support.module#SupportModule' },
  { path: 'contact', loadChildren: './modules/contact/contact.module#ContactModule' },
  { path: 'login', loadChildren: './modules/login/login.module#LoginModule' },
  { path: 'dashboard', loadChildren: './modules/dashboard/dashboard.module#DashboardModule' },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }

