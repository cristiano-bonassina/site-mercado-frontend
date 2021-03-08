import { ApplicationRef, ComponentFactoryResolver, EventEmitter, Injectable, Injector, Type } from "@angular/core";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { DeviceDetectorService } from "ngx-device-detector";
import { DialogComponent } from "../widgets/dialog/dialog.component";

@Injectable({
  providedIn: "root",
})
export class DialogService {
  public constructor(
    private application: ApplicationRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialog: MatDialog,
    private deviceDetectorService: DeviceDetectorService
  ) {}

  public showDialog<T>(title: string, component: Type<T>): DialogRef<T> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    this.application.attachView(componentRef.hostView);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;

    if (this.deviceDetectorService.isMobile()) {
      dialogConfig.width = "90vw";
    }

    const matDialogRef = this.dialog.open(DialogComponent, dialogConfig);

    const dialogComponent = matDialogRef.componentInstance;
    dialogComponent.content = componentRef;
    dialogComponent.title = title;
    dialogComponent.close.subscribe(() => {
      matDialogRef.close();
    });

    return new DialogRef<T>(matDialogRef, dialogComponent, componentRef.instance);
  }
}

class DialogRef<T> {
  public readonly closed = new EventEmitter();

  public constructor(
    matDialogRef: MatDialogRef<DialogComponent>,
    private readonly dialogComponent: DialogComponent,
    public readonly componentInstance: T
  ) {
    matDialogRef.afterClosed().subscribe(() => {
      this.closed.emit();
    });
  }

  public close(): void {
    this.dialogComponent.close.emit();
    this.closed.emit();
  }
}
