import { Component, Input } from "@angular/core";

@Component({
  selector: "app-circle-image",
  templateUrl: "./circle-image.component.html",
  styleUrls: ["./circle-image.component.scss"],
})
export class CircleImageComponent {
  @Input()
  public image?: string;

  @Input()
  public size: number = 32;
}
