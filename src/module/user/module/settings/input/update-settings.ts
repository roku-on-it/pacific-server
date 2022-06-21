import { IsIP, IsOptional } from 'class-validator';

export class UpdateSettings {
  @IsOptional()
  @IsIP('4', { each: true })
  ipWhitelist: string[] = [];
}
