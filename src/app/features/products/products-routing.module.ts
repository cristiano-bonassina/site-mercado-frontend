import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProductDialogComponent } from "./components/product-dialog/product-dialog.component";
import { ProductsComponent } from "./products.component";
import { ProductResolver } from "./resolvers/product-resolver";

const routes: Routes = [
  {
    path: "",
    component: ProductsComponent,
    children: [
      {
        path: "new",
        component: ProductDialogComponent,
        resolve: {
          product: ProductResolver,
        },
      },
      {
        path: ":id",
        component: ProductDialogComponent,
        resolve: {
          product: ProductResolver,
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
