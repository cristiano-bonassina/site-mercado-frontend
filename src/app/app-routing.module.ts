import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainComponent } from "./main/main.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "produtos",
  },
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "produtos",
        loadChildren: () => import("./features/products/products.module").then((m) => m.ProductsModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "produtos",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
