import { Injectable } from "@angular/core";
import { JsonLocalStorage } from "../json-local-storage";
import { Token } from "./token";

const TOKEN_KEY = "auth-token";

@Injectable({ providedIn: "root" })
export class TokenStorage {
  public constructor(private readonly jsonLocalStorage: JsonLocalStorage) {}

  public getToken() {
    return this.jsonLocalStorage.getItem<Token>(TOKEN_KEY);
  }

  public setToken(token?: Token) {
    if (token) {
      this.jsonLocalStorage.setItem(TOKEN_KEY, token);
    } else {
      this.clear();
    }
  }

  public clear() {
    this.jsonLocalStorage.removeItem(TOKEN_KEY);
  }
}
