import React from 'react';
import './auth-component.css';
import AuthViewModel from '../../view-model/auth/AuthViewModel';
import { observer } from "mobx-react";

export interface AuthComponentProps {
  authViewModel: AuthViewModel;
}
@observer
export default class AuthComponent extends React.Component<AuthComponentProps> {

  public render(): JSX.Element {
    const {
      emailQuery,
      passwordQuery,
      isSignInButtonVisible,
      isSignOutButtonVisible,

      isShowError,
      errorMessage,

      authStatus,
      isAuthStatusPositive,
    } = this.props.authViewModel;

    return (
      <div className="row flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="auth-container col bg-white border rounded-lg py-4 px-5">
          <div className="row mt-2 mb-4">
            Status:&nbsp;
            <span className={`${isAuthStatusPositive ? 'text-success' : 'text-danger'}`}>
              {authStatus}
            </span>
          </div>

          <div className="row mt-2">
            <input
              type="text"
              placeholder="user@email.com"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.props.authViewModel.onEmailQueryChanged(e.currentTarget.value);
              }}
              value={emailQuery}
              className="form-control"
            />
          </div>
          <div className="row mt-2">
            <input
              type="password"
              placeholder="password"
              onChange={(e: React.FormEvent<HTMLInputElement>): void => {
                this.props.authViewModel.onPasswordQueryChanged(e.currentTarget.value);
              }}
              value={passwordQuery}
              className="form-control"
            />
          </div>

          {isShowError && (
            <div className="row my-3 text-danger justify-content-center">{errorMessage}</div>
          )}

          {isSignInButtonVisible && (
            <div className="row mt-4">
              <button
                type="button"
                className="col btn btn-primary"
                onClick={(): void => this.props.authViewModel.onClickSignIn()}
              >
                Sign in
              </button>
            </div>
          )}

          {isSignOutButtonVisible && (
            <div className="row mt-4">
              <button
                type="button"
                className="col btn btn-primary"
                onClick={(): void => this.props.authViewModel.onClickSignOut()}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
