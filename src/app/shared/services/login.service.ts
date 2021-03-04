import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AUTH_URL } from "src/app/core/auth/auth.url";
import { Token } from "src/app/core/auth/token";
import { TokenStorage } from "src/app/core/auth/token-storage";
import { User } from "src/app/core/auth/user";
import { UserStorage } from "src/app/core/auth/user-storage";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public readonly loginCompleted: BehaviorSubject<User | undefined>;

  public constructor(
    private readonly httpClient: HttpClient,
    @Inject(AUTH_URL) private readonly apiUrl: string,
    private readonly tokenStorage: TokenStorage,
    private readonly userStorage: UserStorage
  ) {
    const user = userStorage.getUser();
    this.loginCompleted = new BehaviorSubject<User | undefined>(user);
  }

  public async authenticate(username: string, password: string) {
    const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
    let params = new HttpParams()
      .set("client_id", "c46afe5579564d81b755e3358622bddc")
      .set("client_secret", "KXG8aK/jkoWlsiV9rxQeydotiWJGOqYh/wSdhGV7fjs=")
      .set("grant_type", "sitemercado-password")
      .set("username", username)
      .set("password", password)
      .set("scope", "openid offline_access api");
    const endpoint = `${this.apiUrl}/connect/token`;
    const response = await this.httpClient
      .post<TokenResponse>(endpoint, params, { headers, observe: "response" })
      .toPromise();
    if (!response.ok) {
      return Promise.reject(response.statusText);
    }
    if (!response.body) {
      return Promise.reject();
    }

    const { body } = response;
    const token = new Token(body.access_token, body.refresh_token);
    this.tokenStorage.setToken(token);

    const userInfo = await this.userInfo();
    if (userInfo) {
      this.userStorage.setUser(userInfo);
      this.loginCompleted.next(userInfo);
    }
    return token;
  }

  public async userInfo() {
    const token = this.tokenStorage.getToken();
    if (!token) {
      return undefined;
    }

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")
      .set("Authorization", `Bearer ${token.accessToken}`);
    const endpoint = `${this.apiUrl}/connect/userinfo`;
    const response = await this.httpClient
      .get<UserInfoResponse>(endpoint, { headers, observe: "response" })
      .toPromise();

    if (!response.ok) {
      return Promise.reject(response.statusText);
    }

    if (!response.body) {
      return Promise.reject();
    }

    const { body } = response;
    const userinfo = new User(body.sub, body.picture, body.username);
    return userinfo;
  }

  public logout() {
    this.tokenStorage.clear();
    this.userStorage.clear();
    this.loginCompleted.next(undefined);
    return Promise.resolve();
  }
}

class TokenResponse {
  public constructor(public access_token: string, public refresh_token: string) {}
}

class UserInfoResponse {
  public constructor(public sub: string, public picture: string, public username: string) {}
}
