import { IsUUID } from 'class-validator';

export class RefInput {
  @IsUUID()
  id: string;
}
