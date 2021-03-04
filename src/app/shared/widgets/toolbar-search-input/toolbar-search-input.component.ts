import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-toolbar-search-input",
  templateUrl: "./toolbar-search-input.component.html",
  styleUrls: ["./toolbar-search-input.component.scss"],
})
export class ToolbarSearchInputComponent {
  public get searchTerm() {
    return this._searchTerm;
  }

  @Input()
  public set searchTerm(value: string | undefined) {
    if (value === this._searchTerm) {
      return;
    }
    this._searchTerm = value;
    this._searchSubject.next(value);
  }

  @Output()
  public readonly search = new EventEmitter<string>();

  private readonly _searchSubject = new Subject<string>();
  private _searchTerm?: string;

  public constructor() {
    this._searchSubject.pipe(debounceTime(400)).subscribe((value) => {      
      this.search.emit(value);
    });
  }
}
