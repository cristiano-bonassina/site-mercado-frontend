import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MainSearchService {
  public readonly search = new Subject<string>();
}
