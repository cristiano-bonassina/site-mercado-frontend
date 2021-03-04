import { Injectable } from "@angular/core";
import { HotToastService } from "@ngneat/hot-toast";

@Injectable({
  providedIn: "root",
})
export class ToastService {
  public constructor(private toast: HotToastService) {}

  public warning(message: string) {
    return this.toast.warning(message);
  }
}
