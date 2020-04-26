import AuthViewModel from './AuthViewModel';
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';
import AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import FormValidator from '../../util/FormValidator';
import { computed, observable } from "mobx";

export default class AuthViewModelImpl implements AuthViewModel {
  @observable public emailQuery: string;
  @observable public passwordQuery: string;

  @observable public isShowError: boolean;
  @observable public errorMessage: string;

  private loginUseCase: LoginUseCase;
  private authHolder: AuthHolder;

  public constructor(loginUseCase: LoginUseCase, authHolder: AuthHolder) {
    this.emailQuery = '';
    this.passwordQuery = '';

    this.isShowError = false;
    this.errorMessage = '';


    this.loginUseCase = loginUseCase;
    this.authHolder = authHolder;
  }

  @computed public get isSignInButtonVisible() {
    return !this.authHolder.isUserAuthorized
  }

  @computed public get isSignOutButtonVisible() {
    return this.authHolder.isUserAuthorized
  }

  @computed public get authStatus() {
    return this.authHolder.isUserAuthorized ? 'authorized' : 'is not autorized';
  }

  @computed public get isAuthStatusPositive() {
    return this.authHolder.isUserAuthorized
  }

  public onEmailQueryChanged = (loginQuery: string): void => {
    this.emailQuery = loginQuery;
  };

  public onPasswordQueryChanged = (passwordQuery: string): void => {
    this.passwordQuery = passwordQuery;
  };

  public onClickSignIn = async (): Promise<void> => {
    if (!this.validateLoginForm()) {
      return;
    }

    try {
      await this.loginUseCase.loginUser(this.emailQuery, this.passwordQuery);
      this.isShowError = false;
      this.errorMessage = '';
    } catch (e) {
      this.errorMessage = e.message;
      this.isShowError = true;
    }
  };

  public onClickSignOut = (): void => {
    this.authHolder.onSignedOut();
  };

  private validateLoginForm = (): boolean => {
    if (!this.emailQuery) {
      this.isShowError = true;
      this.errorMessage = 'Email cannot be empty';
      return false;
    }
    if (this.errorMessage === 'Email cannot be empty') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    if (!FormValidator.isValidEmail(this.emailQuery)) {
      this.isShowError = true;
      this.errorMessage = 'Email format is not valid';
      return false;
    }
    if (this.errorMessage === 'Email format is not valid') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    if (!this.passwordQuery) {
      this.isShowError = true;
      this.errorMessage = 'Password cannot be empty';
      return false;
    }
    if (this.errorMessage === 'Password cannot be empty') {
      this.isShowError = false;
      this.errorMessage = '';
    }

    return true;
  }
}
