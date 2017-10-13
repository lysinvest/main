import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing.module';

@NgModule({
  imports: [
    SettingsRoutingModule
  ],
  exports: [
    SettingsComponent
  ],
  declarations: [
    SettingsComponent
  ],
  providers: [
  ],
})

export class SettingsModule { }
