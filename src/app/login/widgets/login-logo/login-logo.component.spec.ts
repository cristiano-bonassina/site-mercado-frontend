import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { LoginLogoComponent } from "./login-logo.component";

describe("LogoComponent", () => {
  let component: LoginLogoComponent;
  let fixture: ComponentFixture<LoginLogoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginLogoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
