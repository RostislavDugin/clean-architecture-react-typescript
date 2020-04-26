import { computed, observable } from 'mobx';

export default class AuthHolder {
  @observable private isAuthorized: boolean;
  @observable private authToken: string;

  public constructor() {
    this.isAuthorized = false;
    this.authToken = '';
  }

  public onSignedIn(authToken: string): void {
    this.isAuthorized = true;
    this.authToken = authToken;
  }

  public onSignedOut(): void {
    this.isAuthorized = false;
    this.authToken = '';
  }

  @computed public get isUserAuthorized(): boolean {
    return this.isAuthorized;
  }

  /**
   * @throws {Error} if user is not authorized
   */
  public getAuthToken(): string {
    if (!this.isAuthorized) {
      throw new Error('User is not authorized');
    }

    return this.authToken;
  }
}
