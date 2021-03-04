import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DialogService } from "src/app/shared/services/dialog.service";
import { Product } from "../../models/product";
import { ProductDetailComponent } from "../product-detail/product-detail.component";

@Component({ template: "" })
export class ProductDialogComponent implements OnInit {
  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly dialogService: DialogService
  ) {}

  public ngOnInit(): void {
    const product: Product = this.route.snapshot.data["product"];
    const dialogTitle = product.resourceId ? "productDialog.editTitle" : "productDialog.addTitle";
    const dialogRef = this.dialogService.showDialog(dialogTitle, ProductDetailComponent);
    dialogRef.closed.subscribe(() => {
      this.router.navigate(["../"], { relativeTo: this.route });
    });

    const productDetailComponent = dialogRef.componentInstance;
    productDetailComponent.product = product;
    productDetailComponent.registrationCompleted.subscribe(() => {
      dialogRef.close();
    });
  }
}
