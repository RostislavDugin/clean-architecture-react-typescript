import AuthViewModel from './AuthViewModel';
import BaseView from '../../view/BaseView';
import LoginUseCase from '../../../domain/interactors/auth/LoginUseCase';
import AuthHolder from '../../../domain/entity/auth/models/AuthHolder';
import AuthListener from '../../../domain/entity/auth/models/AuthListener';
import FormValidator from '../../util/FormValidator';

export default class AuthViewModelImpl implements AuthViewModel, AuthListener {
  public emailQuery: string;
  public passwordQuery: string;

  public isShowError: boolean;
  public errorMessage: string;

  private baseView?: BaseView;
  private loginUseCase: LoginUseCase;
  private authHolder: AuthHolder;

  public constructor(loginUseCase: LoginUseCase, authHolder: AuthHolder) {
    this.emailQuery = '';
    this.passwordQuery = '';

    this.isShowError = false;
    this.errorMessage = '';

    this.loginUseCase = loginUseCase;
    this.authHolder = authHolder;

    this.authHolder.addAuthListener(this);
  }

  public attachView = (baseView: BaseView): void => {
    this.baseView = baseView;
  };

  public detachView = (): void => {
    this.baseView = undefined;
  };

  public get isSignInButtonVisible() {
    return !this.authHolder.isUserAuthorized
  }

  public get isSignOutButtonVisible() {
    return this.authHolder.isUserAuthorized
  }

  public get authStatus() {
    return this.authHolder.isUserAuthorized ? 'authorized' : 'is not autorized';
  }

  public get isAuthStatusPositive() {
    return this.authHolder.isUserAuthorized
  }

  public onAuthChanged = (): void => {
    this.notifyViewAboutChanges();
  };

  public onEmailQueryChanged = (loginQuery: string): void => {
    this.emailQuery = loginQuery;
    this.notifyViewAboutChanges();
  };

  public onPasswordQueryChanged = (passwordQuery: string): void => {
    this.passwordQuery = passwordQuery;
    this.notifyViewAboutChanges();
  };

  public onClickSignIn = async (): Promise<void> => {
    if (!this.validateLoginForm()) {
      this.notifyViewAboutChanges();
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

    this.notifyViewAboutChanges();
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

  private notifyViewAboutChanges = (): void => {
    if (this.baseView) {
      this.baseView.onViewModelChanged();
    }
  };
}
