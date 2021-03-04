import { HttpInterceptor } from "@angular/common/http";
import { InjectionToken } from "@angular/core";

export const API_HTTP_INTERCEPTORS = new InjectionToken<HttpInterceptor[]>("API_HTTP_INTERCEPTORS");