import { AfterViewInit, Directive, DoCheck, ElementRef } from "@angular/core";
import { timer } from "rxjs";

@Directive({
  selector: "[square]",
})
export class SquareDirective implements AfterViewInit, DoCheck {
  public constructor(private readonly element: ElementRef) {}

  public ngDoCheck(): void {
    this.updateElementSize();
  }

  public ngAfterViewInit(): void {
    timer(10).subscribe(() => this.updateElementSize());
  }

  private updateElementSize() {
    const element = this.element.nativeElement as HTMLElement;
    const width = element.offsetWidth;
    element.style.height = `${width}px`;
  }
}
