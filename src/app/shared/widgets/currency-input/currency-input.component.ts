import { Component, ElementRef, forwardRef, Input, ViewChild } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-currency-input",
  templateUrl: "./currency-input.component.html",
  styleUrls: ["./currency-input.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CurrencyInputComponent),
      multi: true,
    },
  ],
})
export class CurrencyInputComponent implements ControlValueAccessor {
  @Input()
  public placeholder: string = "";

  public get value() {
    return this._value;
  }

  @Input()
  public set value(value: string | undefined) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.formatDisplayValue();
  }

  @ViewChild("input", { static: true })
  public input?: ElementRef;

  private _value?: string;

  public onChange: any = (value: string) => {};

  public onTouch: any = () => {};

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public onKeyPress($event: KeyboardEvent) {
    const pattern = /[0-9]/;
    if (!pattern.test($event.key)) {
      $event.preventDefault();
    }
  }

  public onValueChange() {
    if (this.value === null || this.value === undefined) {
      return;
    }
    const currentValueWithOnlyNumbers = this.value
      .toString()
      .replace(/(.*){1}/, "0$1")
      .replace(/[^\d]/g, "")
      .replace(/(\d\d?)$/, ".$1");
    const currentValueAsNumber = parseFloat(currentValueWithOnlyNumbers);
    this.onChange(currentValueAsNumber);
  }

  private formatDisplayValue() {
    if (!this.value) {
      return;
    }
    const textWithOnlyNumbers = this.value
      .toString()
      .replace(/(.*){1}/, "0$1")
      .replace(/[^\d]/g, "")
      .replace(/(\d\d?)$/, ".$1");
    const localeNumber = parseFloat(textWithOnlyNumbers).toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    this.value = localeNumber;
  }
}
