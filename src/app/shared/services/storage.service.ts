import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class StorageService {
  public getItem<T>(key: string): T | null {
    const json = localStorage.getItem(key);
    if (!json) {
      return null;
    }

    const item = JSON.parse(json);
    return item as T;
  }

  public setItem(key: string, value: any): void {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
