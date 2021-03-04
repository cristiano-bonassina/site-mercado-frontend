import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorage {
  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }
}
