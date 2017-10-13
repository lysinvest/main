import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from './capitalize.pipe';

@NgModule({
  exports: [
    CapitalizePipe
  ],
  declarations: [
    CapitalizePipe,
  ],
})

export class CapitalizeModule { };
