import { SimpleChanges, forwardRef, OnChanges, AfterViewInit, Component, ElementRef, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

import { Edit } from './edit';

/*@Component({
  selector: 'editod',
  templateUrl: 'edit.component.html',
  styleUrls: ['edit.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MyInputComponent),
      multi: true
    }
  ]
})*/


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
  
    myValue: any = null;
    propagateChange = (_: any) => {};
  
    constructor() { }
  
    writeValue(obj: any): void {
      console.log('writeValue', obj);
      this.myValue = obj;
      //this.propagateChange(this.myValue);
    }
  
    registerOnChange(fn: any): void {
      console.log('0001');
      this.propagateChange = fn;
    }
  
    registerOnTouched(fn: any): void {
    }
    
    setDisabledState(isDisabled: boolean): void {
      // do nothing
    }
    
    changeMe() {
      this.myValue = 'new value changed from inside';
      this.propagateChange(this.myValue);
    }
    
    public onChange(event: any) {
      this.propagateChange(this.myValue);
    }
      
    
  }

//export class EditComponent {

/*  @Input() public model: Edit;
  @Output() changed = new EventEmitter<Edit>();*/
  //  @Input() public caption: string;
  /*  private _name = '';
  
    @Input()
    set name(name: string) {
      this._name = name;
      console.log('0001');
    }
  
    get name(): string {
      console.log('0002');
      return this._name;
    }*/


  //  @Input() public valeur: string;
  /*@Input() public edit: Edit;
    @Output() voted = new EventEmitter<boolean>();*/
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

/*  constructor(elementRef: ElementRef) {
  }*/

  /*  public registerOnChange(fn: any) {
      console.log('0001');
    }
  
    public writeValue(value: any) {
      console.log('0002');
    }
  
    public registerOnTouched(fn: any) {
      console.log('0003');
    }*/

/*  public writeValue(obj: any) {
    console.log('0001');
  };

  public registerOnChange(fn: any) { 
    console.log('0002');
  };

  public registerOnTouched(fn: any) {
    console.log('0003');
  };

  public setDisabledState(isDisabled: boolean) {
    console.log('0004');
  };

  public onChange(event: any) {
    this.model.value = event;
    this.changed.emit(this.model);
  }*/

  //  public onChange(){
  //    this.onValueInParentComponentChanged.emit(this.valueInParentComponent);
  //  }

  /*  ngOnInit(): void {
    }*/
  //    this.placeholder = this.label;

  /*  public onclickButtonInterne() {
    }*/
  /*    console.log('0002:onclickButtonInterne');
        this.clickbutton.emit();*/

  /*  public vote(agreed: boolean) {
    }*/
  //    this.voted.emit(agreed);

  /*  ngAfterViewInit() {
    }*/
  /*    if ((this.length != "0") && (this.displayCharacterCounter)) {
          $(this.edit.nativeElement).characterCounter();
        }*/

//}
