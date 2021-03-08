import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Subject } from "rxjs";
import { Product } from "../../models/product";
import { ProductService } from "../../services/product.service";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
})
export class ProductDetailComponent {
  public readonly errorMesssages = new Array<string>();
  public isSavingChanges?: boolean;
  public product?: Product;
  public readonly registrationCompleted = new Subject<Product>();

  public constructor(private readonly productService: ProductService) {}

  public async saveProductChanges() {
    this.errorMesssages.length = 0;

    if (!this.product) {
      return;
    }

    this.isSavingChanges = true;

    try {
      await this.productService.saveProduct(this.product);
      this.registrationCompleted.next(this.product);
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.error.errors) {
        const errorMesssages: string[] = error.error.errors;
        this.errorMesssages.push(...errorMesssages);
        return;
      }

      const errorMessage = "productDetailComponent.errorSavingProduct";
      this.errorMesssages.push(errorMessage);
    } finally {
      this.isSavingChanges = false;
    }
  }
}
