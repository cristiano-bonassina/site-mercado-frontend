import { AfterViewInit, Component, QueryList, ViewChildren } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { User } from "../core/auth/user";
import { LoginComponent } from "../login/login.component";
import { LoginService } from "../shared/services/login.service";
import { MainSearchService } from "../shared/services/main-search.service";
import { ToolbarSearchInputComponent } from "../shared/widgets/toolbar-search-input/toolbar-search-input.component";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
})
export class MainComponent implements AfterViewInit {
  public user?: User;

  @ViewChildren(ToolbarSearchInputComponent)
  public toolbarSearchInputs?: QueryList<ToolbarSearchInputComponent>;

  public constructor(
    private dialog: MatDialog,
    private loginService: LoginService,
    private mainSearchService: MainSearchService
  ) {
    loginService.loginCompleted.subscribe((user) => {
      this.user = user;
    });
  }

  public ngAfterViewInit(): void {
    this.toolbarSearchInputs?.forEach((toolbarSearchInput) => {
      toolbarSearchInput.search.subscribe((searchTerm) => {
        this.mainSearchService.search.next(searchTerm);
      });
    });
  }

  public login() {
    const loginDialog = this.dialog.open(LoginComponent);
    loginDialog.componentInstance.loginCompleted.subscribe(() => {
      loginDialog.close();
    });
  }

  public logout() {
    this.loginService.logout().then(() => this.login());
  }
}
