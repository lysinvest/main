import { OnInit, forwardRef, Input, Component } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Edit } from './edit';

@Component({
  selector: 'edit',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditComponent),
      multi: true
    }
  ]
})

export class EditComponent implements ControlValueAccessor {
  //export class EditComponent {

  //  @Input() public model: string;
  //public model: Edit = new Edit;
  /*  public caption: string;
public name: string;
public glyph: string;
public value: string;*/
  //  @Input() public tutu: boolean = false;

  public selectedValue: string;
  @Input() public model: string;
  propagateChange = (_: any) => { };
  constructor() { }

  public writeValue(value: any) {
    this.selectedValue = value;
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any) {
    //    this.propagateTouched = fn;
  }

  public onChange(event: any) {
    this.model = event;
    this.propagateChange(event);
  }

  /*  writeValue(obj: Edit): void {
      if (obj != null) {
        this.model = obj;
      }
    }*/
  /*    writeValue(obj: any): void {
      }*/

  /*    @Input() public set tutu(tutu: boolean) {
        this.model.tutu = tutu;
      };
  
      public get tutu(): boolean {
        return this.tutu;
      };*/
  //  public get tutu: boolean = false;

  /*    registerOnChange(fn: any): void {
        this.propagateChange = fn;
      }*/

  /*    registerOnTouched(fn: any): void {
      }*/

  /*  setDisabledState(isDisabled: boolean): void {
    }*/

  //  public onChange(event: any) {
  //    this.model.value = event;
  //    this.propagateChange(this.model);
  //  }

  /*  public onChange(event: any) {
      this.model = event;
    }*/

}
