import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorage } from "../auth/token-storage";

@Injectable({ providedIn: "root" })
export class AuthTokenInterceptor implements HttpInterceptor {
  public constructor(private tokenStorage: TokenStorage) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
    if (token) {
      const headers = request.headers.set("Authorization", `Bearer ${token.accessToken}`);
      request = request.clone({ headers });
    }

    return next.handle(request);
  }
}
