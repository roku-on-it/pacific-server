import { IsPassword } from '../../shared/decorator/validator/is-password';
import { IsEmail } from 'class-validator';

export class Login {
  @IsEmail()
  email: string;

  @IsPassword()
  masterPassword: string;
}
