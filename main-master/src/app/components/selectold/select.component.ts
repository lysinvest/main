import { AfterViewInit, Component, Input, Output, ElementRef, EventEmitter, OnInit, NgModule, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';

import { SelectRoutingModule } from './select.routing.module';

declare const $: any;

@Component({
  selector: 'selectod',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})

export class SelectComponent implements AfterViewInit {
  @Input() public name: string = '';
  @Input() public caption: string = '';
  @Input() public enabled: Boolean = false;
  @Input() public optionSelected: any;
  @Input() public options: any[];
  @ViewChild('select') select: ElementRef;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  public firstLoad: boolean = true;

  constructor() { }

  ngAfterViewInit() {
    if (this.firstLoad) {
      this.firstLoad = false;
      setTimeout(() => {
        $(this.select.nativeElement).material_select();
        $(this.select.nativeElement).on('change', function (this: any, $event: any) {
        }, ($event: any) => {
          this.onChange($event);
        });
      }, 500);
    }
  }

  onChange(event: any) {
    if (this.optionSelected != event.target.value) {
      this.optionSelected = event.target.value;
      this.change.emit(this.optionSelected);
    }
  }

  ngOnDestroy() {
    $(this.select.nativeElement).material_select('destroy');
  }
}
