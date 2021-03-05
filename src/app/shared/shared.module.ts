import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule, FlexModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTooltipModule } from "@angular/material/tooltip";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { LoginComponent } from "../login/login.component";
import { LoginLogoComponent } from "../login/widgets/login-logo/login-logo.component";
import { MainComponent } from "../main/main.component";
import { SquareDirective } from "./directives/square.directive";
import { Base64Pipe } from "./pipes/base64.pipe";
import { ResourceUrlPipe } from "./pipes/resource-url.pipe";
import { UserCurrencyPipe } from "./pipes/user-currency.pipe";
import { AccountIconComponent } from "./widgets/account-icon/account-icon.component";
import { CircleImageComponent } from "./widgets/circle-image/circle-image.component";
import { CurrencyInputComponent } from "./widgets/currency-input/currency-input.component";
import { DeleteButtonComponent } from "./widgets/delete-button/delete-button.component";
import { DialogComponent } from "./widgets/dialog/dialog.component";
import { EmptyStateComponent } from "./widgets/empty-state/empty-state.component";
import { ErrorMessageComponent } from "./widgets/error-message/error-message.component";
import { FooterComponent } from "./widgets/footer/footer.component";
import { ImagePickerComponent } from "./widgets/image-picker/image-picker.component";
import { LoadingButtonComponent } from "./widgets/loading-button/loading-button.component";
import { LoadingOverlayComponent } from "./widgets/loading-overlay/loading-overlay.component";
import { TextInputComponent } from "./widgets/text-input/text-input.component";
import { ToolbarItemComponent } from "./widgets/toolbar-item/toolbar-item.component";
import { ToolbarLogoComponent } from "./widgets/toolbar-logo/toolbar-logo.component";
import { ToolbarSearchInputComponent } from "./widgets/toolbar-search-input/toolbar-search-input.component";
import { ToolbarComponent } from "./widgets/toolbar/toolbar.component";

@NgModule({
  declarations: [
    AccountIconComponent,
    CircleImageComponent,
    DeleteButtonComponent,
    LoginComponent,
    LoginLogoComponent,
    MainComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    ToolbarLogoComponent,
    ToolbarSearchInputComponent,
    UserCurrencyPipe,
    FooterComponent,
    LoadingButtonComponent,
    DialogComponent,
    TextInputComponent,
    CurrencyInputComponent,
    ImagePickerComponent,
    Base64Pipe,
    ResourceUrlPipe,
    LoadingOverlayComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    SquareDirective,
  ],
  imports: [
    CommonModule,
    FlexModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    TranslateModule,
    MatTooltipModule,
    MatMenuModule,
    MatInputModule,
    MatCardModule,
    MatRippleModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  exports: [
    AccountIconComponent,
    CircleImageComponent,
    DeleteButtonComponent,
    LoginComponent,
    LoginLogoComponent,
    MainComponent,
    ToolbarComponent,
    ToolbarItemComponent,
    ToolbarLogoComponent,
    ToolbarSearchInputComponent,
    UserCurrencyPipe,
    CommonModule,
    FlexModule,
    FlexLayoutModule,
    MatBadgeModule,
    MatDialogModule,
    MatIconModule,
    RouterModule,
    TranslateModule,
    MatButtonModule,
    LoadingButtonComponent,
    MatCardModule,
    MatRippleModule,
    FormsModule,
    TextInputComponent,
    CurrencyInputComponent,
    ImagePickerComponent,
    MatProgressSpinnerModule,
    Base64Pipe,
    ResourceUrlPipe,
    LoadingOverlayComponent,
    ErrorMessageComponent,
    EmptyStateComponent,
    SquareDirective,
  ],
  entryComponents: [],
})
export class SharedModule {}
