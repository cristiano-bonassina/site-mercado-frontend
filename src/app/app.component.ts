import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LoginService } from "./shared/services/login.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  public title = "sitemercado";

  public constructor(translateService: TranslateService, loginService: LoginService) {
    translateService.setDefaultLang("en");
    translateService.use("en");
  }
}
