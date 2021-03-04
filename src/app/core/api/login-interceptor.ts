import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoginComponent } from "../../login/login.component";

@Injectable({ providedIn: "root" })
export class LoginInterceptor implements HttpInterceptor {
  public constructor(private dialog: MatDialog) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((requestError) => {
        const errorResponse = requestError as HttpErrorResponse;
        if (errorResponse.status === 401) {
          this.x();
        }
        throw requestError;
      })
    );
  }

  private x() {
    this.dialog.open(LoginComponent);
  }
}
