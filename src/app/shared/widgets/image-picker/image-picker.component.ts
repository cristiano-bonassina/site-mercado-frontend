import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"],
})
export class ImagePickerComponent {
  @Input()
  public image?: any;

  @Output()
  public readonly imageChange = new EventEmitter<any>();

  public selectImageFile($event: Event | any) {
    const files: FileList = $event.target.files;
    const file = files[0];
    this.processFile(file);
  }

  private processFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      var base64Content = e.target.result.split(",")[1];
      this.image = base64Content;
      this.imageChange.emit(this.image);
    };
    reader.readAsDataURL(file);
  }
}
