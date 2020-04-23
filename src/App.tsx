import React from 'react';
import './app.css';
import AuthComponent from './view/view/auth/AuthComponent';
import AuthViewModelImpl from './view/view-model/auth/AuthViewModelImpl';
import AuthRepositoryImpl from './data/auth/AuthRepositoryImpl';
import LoginUseCase from './domain/interactors/auth/LoginUseCase';
import AuthHolder from './domain/entity/auth/models/AuthHolder';

function App(): JSX.Element {
  // data layer
  const authRepository = new AuthRepositoryImpl();
  // domain layer
  const authHolder = new AuthHolder();
  const loginUseCase = new LoginUseCase(authRepository, authHolder);
  // view layer
  const authViewModel = new AuthViewModelImpl(loginUseCase, authHolder);

  return (
    <div className="app-container d-flex container-fluid">
      <AuthComponent authViewModel={authViewModel} />
    </div>
  );
}

export default App;
