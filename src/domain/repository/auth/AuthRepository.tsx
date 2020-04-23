import ValidationResult from '../../entity/auth/stuctures/ValidationResult';
import AuthorizationResult from '../../entity/auth/stuctures/AuthorizationResult';

export default interface AuthRepository {
  /**
   * @throws {Error} if validation has not passed
   */
  validateCredentials(email: string, password: string): Promise<ValidationResult>;

  /**
   * @throws {Error} if credentials have not passed
   */
  login(email: string, password: string, validationKey: string): Promise<AuthorizationResult>;
}
