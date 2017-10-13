import { AfterViewInit, Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Edit } from './edit';

@Component({
  selector: 'editod',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
})

export class EditComponent implements OnInit {
  @Input() public caption: string;
  @Input() public edit: Edit;
  @Output() voted = new EventEmitter<boolean>();
  //  @Input() public model: Model;
  /*  @Input() public caption: string = '';
    @Input() public type: string = '';*/
  //  @Output() public clickbutton = new EventEmitter<string>();
  /*  @Input() public value: string = '';
    @Input() public inputValue: string;
    @ViewChild('input') input: ElementRef;*/
  /*  @Input() public length: string = '0';
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public enabled: Boolean = false;
  @Input() public value: string = '';
  @Input() public glyph: string = '';
  @Input() public readonly: boolean = false;
  @Output() public valueChange = new EventEmitter<string>();
  @Input() public formGroup: FormGroup;
  @Input() public error: any;
  @Input() public required: boolean = false;
  @Input() public displayCharacterCounter: boolean = true;
  @ViewChild('edit') edit: ElementRef;
  public elementRef: ElementRef;*/

  constructor(elementRef: ElementRef) {
    //    this.elementRef = elementRef;
  }

  ngOnInit(): void {
    //    this.placeholder = this.label;
  }

  public onclickButtonInterne() {
/*        this.clickbutton.emit();*/
  }

  public vote(agreed: boolean) {
    this.voted.emit(agreed);
  }

  ngAfterViewInit() {
    /*    if ((this.length != "0") && (this.displayCharacterCounter)) {
          $(this.edit.nativeElement).characterCounter();
        }*/
  }

}
