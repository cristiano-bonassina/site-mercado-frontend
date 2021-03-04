export class AuthRequest {
  public constructor(
    public clientId: string,
    public clientSecret: string,
    public grantType: string,
    public username: string,
    public password: string,
    public scope: string
  ) {}
}
