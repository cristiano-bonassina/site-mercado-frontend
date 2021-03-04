import { CurrencyPipe, getLocaleCurrencyCode } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "userCurrency",
})
export class UserCurrencyPipe implements PipeTransform {
  public transform(value: string | number | undefined, ...args: unknown[]): string | null {
    var locale = navigator.language;
    const currencyCode = getLocaleCurrencyCode(locale) ?? undefined;
    return new CurrencyPipe(locale, currencyCode).transform(value ?? 0);
  }
}
