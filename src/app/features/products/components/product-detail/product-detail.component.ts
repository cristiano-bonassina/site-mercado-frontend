import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent {
  public isSavingChanges?: boolean;
  public product?: Product;
  public readonly registrationCompleted = new Subject<Product>();

  public constructor(private readonly productService: ProductService) {}

  public async saveProductChanges() {
    if (!this.product) {
      return;
    }

    this.isSavingChanges = true;

    try {
      await this.productService.saveProduct(this.product);
      this.registrationCompleted.next(this.product);
    } catch (error) {
      console.log({ error });
    } finally {
      this.isSavingChanges = false;
    }
  }
}
