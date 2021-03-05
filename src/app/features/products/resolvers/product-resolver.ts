import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Product } from "../models/product";
import { ProductService } from "../services/product.service";

@Injectable({ providedIn: "root" })
export class ProductResolver implements Resolve<Product> {
  public constructor(private productService: ProductService) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Product> {
    const productId = route.paramMap.get("id");
    if (!productId) {
      return Promise.resolve(new Product());
    }
    return this.productService.getProduct(productId);
  }
}
