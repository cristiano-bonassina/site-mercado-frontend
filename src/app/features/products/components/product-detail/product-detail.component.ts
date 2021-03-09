import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
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
  public readonly registrationCompleted = new Subject<Product>();

  public get product() {
    return this._product;
  }

  @Input()
  public set product(value: Product | undefined) {
    if (value === this._product) {
      return;
    }
    this._product = value;
    this._productOld = { ...value };
  }

  private _product?: Product;
  private _productOld?: Product;

  public constructor(private readonly productService: ProductService) {}

  public async saveProductChanges() {
    this.errorMesssages.length = 0;

    if (!this.product) {
      return;
    }

    this.isSavingChanges = true;

    try {
      const isNewProduct = !this.product.resourceId;
      if (isNewProduct) {
        await this.productService.createProduct(this.product);
      } else if (this.productWasChanged()) {
        const productId = this.product.resourceId!;
        const productPatch = this.getProductChanges();
        await this.productService.updateProduct(productId, productPatch);
      }
      this.productService.productSaved.next(this.product);
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

  private productWasChanged(): boolean {
    return Object.keys(this._product!).some((key) => (this._product as any)[key] !== (this._productOld as any)[key]);
  }

  private getProductChanges(): Partial<Omit<Product, "resourceId">> {
    const product = new Product();
    const productChangedProperties = this.getProductChangedProperties();
    productChangedProperties.forEach((property) => {
      (product as any)[property] = (this._product as any)[property];
    });
    return product;
  }

  private getProductChangedProperties(): string[] {
    return Object.keys(this._product!).filter((key) => {
      return (this._product as any)[key] !== (this._productOld as any)[key];
    });
  }
}
