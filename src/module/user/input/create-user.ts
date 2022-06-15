import { MinLength } from 'class-validator';

export class CreateUser {
  @MinLength(3)
  username: string;

  @MinLength(4)
  password: string;
}
