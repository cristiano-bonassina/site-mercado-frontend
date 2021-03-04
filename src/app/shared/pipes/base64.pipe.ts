import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "base64",
})
export class Base64Pipe implements PipeTransform {
  public transform(value: string | undefined, ...args: unknown[]): string | undefined {
    if (!value) {
      return undefined;
    }
    return `data:image/jpeg;base64, ${value}`;
  }
}
