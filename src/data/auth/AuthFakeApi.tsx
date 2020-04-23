import AuthRepository from '../../domain/repository/auth/AuthRepository';
import ValidationResult from '../../domain/entity/auth/stuctures/ValidationResult';
import AuthorizationResult from '../../domain/entity/auth/stuctures/AuthorizationResult';

export default class AuthFakeApi implements AuthRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateCredentials(email: string, password: string): Promise<ValidationResult> {
    return new Promise((resolve, reject) => {
      if (password.length < 5) {
        reject(new Error('Password length should be more than 5 characters'));
        return;
      }

      resolve({
        validationKey: 'A34dZ7',
      });
    });
  }

  /**
   * @throws {Error} if credentials have not passed
   */
  login(email: string, password: string, validationKey: string): Promise<AuthorizationResult> {
    return new Promise((resolve, reject) => {
      if (validationKey === 'A34dZ7') {
        if (email === 'user@email.com' && password === 'password') {
          resolve({
            authorizationToken: 'Bearer ASKJdsfjdijosd93wiesf93isef',
          });
        }
      } else {
        reject(new Error('Validation key is not correct. Please try later'));
        return;
      }

      reject(new Error('Email or password is not correct'));
    });
  }
}
