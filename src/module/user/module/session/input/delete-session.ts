import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteSession {
  @IsNotEmpty()
  @IsString()
  token: string;
}
