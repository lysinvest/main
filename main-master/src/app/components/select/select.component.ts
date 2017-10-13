import { Component, EventEmitter, forwardRef, Input, ElementRef, NgModule, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { SelectModel } from './select.model';

declare const $: any;

@Component({
  selector: 'select-si',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})

export class SelectComponent implements ControlValueAccessor {

  public selectedValue: number;
  @ViewChild('select') select: ElementRef;
  @Input() public name: string = '';
  @Input() public model: SelectModel;
  @Input() public class: string;
  @Output() change: EventEmitter<any> = new EventEmitter<any>();

  propagateChange = (_: any) => { };

  constructor() { }

  public writeValue(obj: number): void {
    //    if (obj != null) {
    this.selectedValue = obj;
    //    }
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {
  }

  public ngAfterViewInit() {
    $(this.select.nativeElement).material_select();
    $(this.select.nativeElement).on('change', function (this: any, $event: any) {
    }, ($event: any) => {
      this.onChange($event);
    });
  }

  public onChange(event: any) {
    this.change.emit(event.target.value);
    this.propagateChange(event.target.value);
  }

  public ngOnDestroy() {
    //$(this.select.nativeElement).material_select('destroy');
  }

}
