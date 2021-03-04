import { Injectable } from "@angular/core";
import { LocalStorage } from "./local-storage";

@Injectable({
  providedIn: "root",
})
export class JsonLocalStorage {
  public constructor(private readonly localStorage: LocalStorage) {}

  public getItem<T>(key: string): T | undefined {
    const json = this.localStorage.getItem(key);
    if (!json) {
      return undefined;
    }
    const item: T = JSON.parse(json);
    return item;
  }

  public setItem<T>(key: string, value: T) {
    const json = JSON.stringify(value);
    this.localStorage.setItem(key, json);
  }

  public removeItem(key: string) {
    this.localStorage.removeItem(key);
  }
}
