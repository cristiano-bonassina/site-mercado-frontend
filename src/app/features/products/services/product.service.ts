import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { ApiHttpClient } from "src/app/core/api/api-http-client";
import { Resources } from "../../../core/api/resources";
import { Product } from "../models/product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  public readonly productSaved = new Subject<Product>();

  public constructor(private readonly httpClient: ApiHttpClient) {}

  public async deleteProduct(productId: string): Promise<Product> {
    const resourceUrl = `${Resources.v1.product}/${productId}`;
    var product = await this.httpClient.delete(resourceUrl).toPromise();
    return product;
  }

  public async getProduct(productId: string): Promise<Product> {
    const resourceUrl = `${Resources.v1.product}/${productId}`;
    var product = await this.httpClient.get<Product>(resourceUrl).toPromise();
    return product;
  }

  public async getProducts(name?: string): Promise<Product[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set("name", name);
    }
    var products = await this.httpClient
      .get<Product[]>(Resources.v1.product, { params })
      .toPromise();
    return products;
  }

  public async createProduct(product: Product) {
    type ApiResponseType = { resourceId: string; version: number };
    const apiResponse = await this.httpClient.post<ApiResponseType>(Resources.v1.product, product).toPromise();
    product.resourceId = apiResponse.resourceId;
    return apiResponse;
  }

  public async updateProduct(productId: string, productPatch: Partial<Omit<Product, "resourceId">>) {
    const patchRequest = Object.keys(productPatch).map((key) => {
      const operation = {
        op: "replace",
        path: key,
        value: (productPatch as any)[key],
      };
      return operation;
    });
    const endpoint = `${Resources.v1.product}/${productId}`;
    const apiResponse = await this.httpClient.patch(endpoint, patchRequest).toPromise();
    return apiResponse;
  }
}
