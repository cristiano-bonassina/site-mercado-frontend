import { Component, ComponentRef, ElementRef, EmbeddedViewRef, EventEmitter, OnDestroy, Output } from "@angular/core";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrls: ["./dialog.component.scss"],
})
export class DialogComponent implements OnDestroy {
  public get content() {
    return this._content;
  }

  public set content(value: ComponentRef<any> | undefined) {
    this._content = value;
    this.onContentChanged(value);
  }

  private get contentContainer(): Element | null {
    if (!this._contentContainer) {
      const html = this.element.nativeElement as HTMLElement;
      this._contentContainer = html.querySelector("#dialog-content");
    }
    return this._contentContainer;
  }

  public title?: string;

  @Output()
  public readonly close = new EventEmitter();

  private _content?: ComponentRef<any>;
  private _contentContainer?: Element | null;

  public constructor(private readonly element: ElementRef) {}

  public ngOnDestroy(): void {
    this.content?.destroy();
  }

  private onContentChanged(value: ComponentRef<any> | undefined) {
    if (!this.contentContainer) {
      return;
    }
    if (!value) {
      return;
    }
    const componentRootNode = (value.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.contentContainer.appendChild(componentRootNode);
  }
}
