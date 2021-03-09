import { CurrencyPipe, getLocaleCurrencyCode } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "userCurrency",
})
export class UserCurrencyPipe implements PipeTransform {
  public transform(value: string | number | undefined, ...args: unknown[]): string | null {
    const locale = "pt-BR";
    const currencyCode = getLocaleCurrencyCode(locale) ?? undefined;
    return new CurrencyPipe(locale, currencyCode).transform(value ?? 0);
  }
}
