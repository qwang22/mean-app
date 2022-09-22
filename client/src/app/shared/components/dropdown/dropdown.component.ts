import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DropdownComponent),
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {

  @Input() options: { label: string, value: string } | any = [];
  @Input() label?: string;
  @Input() placeholder: string = 'Select';
  @Input() required?: boolean;
  @Input() disabled?: boolean;

  @Input('value') _value: any;
  get value() {
    return this._value;
  }
  set value(val: any) {
    this._value = val;
    this.onChange(val);
    if (val !== null) {
      this.onTouched();
    }
  }

  @Output() change = new EventEmitter<any>();

  onChange: any = () => { return };
  onTouched: any = () => { return };

  selectionChange(val: any): void {
    this.onTouched();
    this.value = val;
    this.onChange(val);
    this.change.emit(val);
  }

  writeValue(val: any): void {
    this.value = val;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: any) => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
