import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({
  name: "resourceUrl",
})
export class ResourceUrlPipe implements PipeTransform {
  public constructor(private readonly sanitizer: DomSanitizer) {}

  public transform(value: string | undefined, ...args: unknown[]): SafeResourceUrl | undefined {
    if (!value) {
      return undefined;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
