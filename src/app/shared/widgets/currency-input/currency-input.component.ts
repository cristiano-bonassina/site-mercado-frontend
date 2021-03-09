import { Component, forwardRef, Input } from "@angular/core";
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

  @Input()
  public text?: string;

  public get value() {
    return this._value;
  }

  @Input()
  public set value(value: number | undefined) {
    if (this._value === value) {
      return;
    }
    this._value = value;
    this.updateInputTextFromCurrentValue();
    this.onChange(value);
  }

  private _value?: number;

  public onChange: any = (value: number) => {};

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

  public onInput() {
    if (this.text == undefined) {
      return;
    }
    const textWithOnlyNumbers = this.text
      .replace(/(.*){1}/, "0$1")
      .replace(/[^\d]/g, "")
      .replace(/(\d\d?)$/, ".$1");
    this.value = parseFloat(textWithOnlyNumbers);
  }

  private updateInputTextFromCurrentValue() {
    if (!this.value) {
      return;
    }
    const localeNumber = this.value.toLocaleString("pt-BR", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    this.text = localeNumber;
  }
}
