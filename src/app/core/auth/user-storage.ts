import { Injectable } from "@angular/core";
import { JsonLocalStorage } from "../json-local-storage";
import { User } from "./user";

const USER_KEY = "user";

@Injectable({ providedIn: "root" })
export class UserStorage {
  public constructor(private readonly jsonLocalStorage: JsonLocalStorage) {}

  public getUser() {
    return this.jsonLocalStorage.getItem<User>(USER_KEY);
  }

  public setUser(user?: User) {
    if (user) {
      this.jsonLocalStorage.setItem(USER_KEY, user);
    } else {
      this.clear();
    }
  }

  public clear() {
    this.jsonLocalStorage.removeItem(USER_KEY);
  }
}
