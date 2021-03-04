import { HttpBackend, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, InjectionToken, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { SingleInterceptorHttpHandler } from "./single-interceptor-http-handler";

export class MultipleInterceptorHttpHandler extends HttpHandler {
  private chain: HttpHandler | null = null;

  public constructor(
    private httpBackend: HttpBackend,
    @Inject(Injector) private injector: Injector,
    private interceptors: InjectionToken<HttpInterceptor[]>
  ) {
    super();
  }

  public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    if (this.chain === null) {
      const interceptors = this.injector.get(this.interceptors);
      this.chain = interceptors.reduceRight(
        (next, interceptor) => new SingleInterceptorHttpHandler(next, interceptor),
        this.httpBackend
      );
    }
    return this.chain.handle(req);
  }
}
