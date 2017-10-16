import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'checkbox',
  templateUrl: 'checkbox.component.html'
})

export class CheckBoxComponent {
  @Input() public name: string = "";
  @Input() public label: string = "";
  @Input() public enabled: Boolean = false;
  @Input() public value: Boolean = false;
  @Input() public formGroup: FormGroup;
  @Input() public error: any;
  @Input() public glyph: any;
  @Input() public className: String;
  @Output() public valueChange = new EventEmitter<Boolean>();
}
