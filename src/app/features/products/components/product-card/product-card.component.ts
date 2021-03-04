import { Component, EventEmitter, Input, Output } from "@angular/core";
import { DeviceDetectorService } from "ngx-device-detector";
import { Product } from "../../models/product";

@Component({
  selector: "app-product-card",
  templateUrl: "./product-card.component.html",
  styleUrls: ["./product-card.component.scss"],
})
export class ProductCardComponent {
  public readonly isMobile: boolean;

  @Input()
  public product?: Product;

  public showLoadingOverlay?: boolean;

  @Output()
  public readonly removeProduct = new EventEmitter<Product>();

  public constructor(deviceDetectorService: DeviceDetectorService) {
    this.isMobile = deviceDetectorService.isMobile() || deviceDetectorService.isTablet();
  }

  public onRemoveButtonClick($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
    $event.stopImmediatePropagation();
    this.removeProduct.emit(this.product);
  }
}
