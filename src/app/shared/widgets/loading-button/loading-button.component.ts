import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-loading-button",
  templateUrl: "./loading-button.component.html",
})
export class LoadingButtonComponent {
  @Input()
  public showWorkingIndicator?: boolean;

  @Input()
  public text?: string;

  @Output()
  public readonly click = new EventEmitter();

  public onClick($event: Event) {
    $event.preventDefault();
    $event.stopImmediatePropagation();
    $event.stopPropagation();
    if (this.showWorkingIndicator) {
      return;
    }
    this.click.emit();
  }
}
