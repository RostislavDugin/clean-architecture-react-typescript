export default interface AuthViewModel {
  emailQuery: string;
  passwordQuery: string;
  isSignInButtonVisible: boolean;
  isSignOutButtonVisible: boolean;

  isShowError: boolean;
  errorMessage: string;

  authStatus: string;
  isAuthStatusPositive: boolean;

  onEmailQueryChanged(loginQuery: string): void;
  onPasswordQueryChanged(passwordQuery: string): void;
  onClickSignIn(): void;
  onClickSignOut(): void;
}
