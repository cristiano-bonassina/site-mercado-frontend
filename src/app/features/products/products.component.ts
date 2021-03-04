import { Component } from "@angular/core";
import { ActivatedRoute, NavigationExtras, Router } from "@angular/router";
import { LoginService } from "src/app/shared/services/login.service";
import { MainSearchService } from "src/app/shared/services/main-search.service";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { Product } from "./models/product";
import { ProductService } from "./services/product.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent {
  public get emptyMessage(): string {
    if (this._searchTerm) {
      return "productsComponent.noProductsFound";
    }
    return "productsComponent.noRegisteredProducts";
  }

  public errorLoadingProducts?: boolean;

  public isSearchingProducts?: boolean;

  public readonly products: Product[] = new Array<Product>();

  private _searchTerm?: string;

  public constructor(
    loginService: LoginService,
    mainSearchService: MainSearchService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {
    loginService.loginCompleted.subscribe((user) => {
      if (!user) {
        this.products.length = 0;
        return;
      }
      this.searchProducts();
    });
    mainSearchService.search.subscribe((searchTerm) => {
      this._searchTerm = searchTerm;
      this.searchProducts();
    });
    productService.productSaved.subscribe((product) => {
      var sameProductOnCurrentList = this.products.find((x) => x.resourceId === product.resourceId);
      if (sameProductOnCurrentList) {
        Object.keys(product).forEach((key) => {
          (sameProductOnCurrentList as any)[key] = (product as any)[key];
        });
      } else {
        this.products.push(product);
      }
    });
  }

  public editProduct(productCard: ProductCardComponent, product: Product): void {
    productCard.showLoadingOverlay = true;
    const extras: NavigationExtras = {
      relativeTo: this.route,
      state: { product },
    };
    this.router.navigate([".", product.resourceId], extras).finally(() => {
      productCard.showLoadingOverlay = false;
    });
  }

  public addProduct() {
    const extras: NavigationExtras = {
      relativeTo: this.route,
    };
    this.router.navigate(["new"], extras);
  }

  public removeProduct(productCard: ProductCardComponent, product: Product) {
    if (!product.resourceId) {
      return;
    }
    productCard.showLoadingOverlay = true;
    this.productService
      .deleteProduct(product.resourceId)
      .then(() => {
        const productIndexOnCurrentList = this.products.indexOf(product);
        if (productIndexOnCurrentList > -1) {
          this.products.splice(productIndexOnCurrentList, 1);
        }
      })
      .catch(() => {
        // TODO
      })
      .finally(() => {
        productCard.showLoadingOverlay = false;
      });
  }

  public searchProducts(): void {
    this.errorLoadingProducts = false;
    this.isSearchingProducts = true;
    this.productService
      .getProducts(this._searchTerm)
      .then((products) => {
        this.products.length = 0;
        this.products.push(...products);
      })
      .catch(() => {
        this.errorLoadingProducts = true;
      })
      .finally(() => {
        this.isSearchingProducts = false;
      });
  }
}
