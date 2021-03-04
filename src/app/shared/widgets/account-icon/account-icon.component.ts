import { Component, Input } from "@angular/core";
import { User } from "src/app/core/auth/user";

@Component({
  selector: "app-account-icon",
  templateUrl: "./account-icon.component.html",
  styleUrls: ["./account-icon.component.scss"],
})
export class AccountIconComponent {
  @Input()
  public user?: User;
}
