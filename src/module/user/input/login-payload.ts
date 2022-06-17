import { IsPassword } from '../../shared/decorator/validator/is-password';
import { IsEmail } from 'class-validator';

export class LoginPayload {
  @IsEmail()
  email: string;

  @IsPassword()
  masterPassword: string;
}
