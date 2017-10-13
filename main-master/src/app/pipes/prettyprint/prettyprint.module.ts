import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { PrettyPrintPipe } from './prettyprint.pipe';

@NgModule({
  exports: [
    PrettyPrintPipe
  ],
  declarations: [
    PrettyPrintPipe,
  ],
})

export class PrettyPrintModule { };
