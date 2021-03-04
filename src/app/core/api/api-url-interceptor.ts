import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_URL } from "./api.url";

@Injectable({ providedIn: "root" })
export class ApiUrlInterceptor implements HttpInterceptor {
  public constructor(@Inject(API_URL) private readonly apiUrl: string) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.startsWith("http")) {
      const url = `${this.apiUrl}${request.url}`;
      request = request.clone({ url });
    }
    return next.handle(request);
  }
}
