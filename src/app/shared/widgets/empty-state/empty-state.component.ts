import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-empty-state",
  templateUrl: "./empty-state.component.html",
})
export class EmptyStateComponent {
  @Input()
  public action?: string;

  @Input()
  public message?: string;

  @Output()
  public readonly actionClick = new EventEmitter();
}
