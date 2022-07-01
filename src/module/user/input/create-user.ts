import { IsEmail } from 'class-validator';
import { IsPassword } from '../../shared/decorator/validator/is-password';

export class CreateUser {
  @IsEmail()
  email: string;

  @IsPassword()
  masterPassword: string;
}
