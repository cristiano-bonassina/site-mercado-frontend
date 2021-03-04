import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class SingleInterceptorHttpHandler extends HttpHandler {
  public constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {
    super();
  }

  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.interceptor.intercept(req, this.next);
  }
}
