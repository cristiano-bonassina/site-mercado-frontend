import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "../../shared/shared.module";
import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { ProductDialogComponent } from "./components/product-dialog/product-dialog.component";
import { ProductsRoutingModule } from "./products-routing.module";
import { ProductsComponent } from "./products.component";

@NgModule({
  declarations: [ProductsComponent, ProductDetailComponent, ProductCardComponent, ProductDialogComponent],
  imports: [ProductsRoutingModule, CommonModule, SharedModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
