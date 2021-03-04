import { HttpBackend, HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { API_HTTP_INTERCEPTORS } from "./api-http-interceptor";
import { MultipleInterceptorHttpHandler } from "./multiple-interceptor-http-handler";

@Injectable({ providedIn: "root" })
export class ApiHttpClient extends HttpClient {
  public constructor(backend: HttpBackend, injector: Injector) {
    super(new MultipleInterceptorHttpHandler(backend, injector, API_HTTP_INTERCEPTORS));
  }
}
