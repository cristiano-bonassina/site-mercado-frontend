import { HttpErrorResponse } from "@angular/common/http";
import { Component, Input } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Subject } from "rxjs";
import { LoginService } from "../shared/services/login.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  public errorMessage?: string;

  public loginInProgress?: boolean;

  @Input()
  public password?: string;

  @Input()
  public username?: string;

  public readonly loginCompleted = new Subject();

  public constructor(private dialogRef: MatDialogRef<LoginComponent>, private loginService: LoginService) {
    // for test purposes only
    this.username = "11234567890";
    this.password = "09876543211";
  }

  public login(): void {
    const { username, password } = this;
    if (!password) {
      return;
    }
    if (!username) {
      return;
    }
    this.loginInProgress = true;
    this.errorMessage = undefined;
    this.loginService
      .authenticate(username, password)
      .then(() => {
        this.loginCompleted.next();
        this.dialogRef.close();
      })
      .catch((error) => {
        if (error instanceof HttpErrorResponse && error.error?.error_description) {
          this.errorMessage = error.error.error_description;
          return;
        }

        this.errorMessage = "loginComponent.loginError";
      })
      .finally(() => {
        this.loginInProgress = false;
      });
  }

  public logout() {
    this.loginService.logout();
  }
}
