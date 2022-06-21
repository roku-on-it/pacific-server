import { IsBoolean, IsIP, IsOptional } from 'class-validator';

export class UpdateSettings {
  @IsOptional()
  @IsBoolean()
  theme: boolean;

  @IsOptional()
  @IsIP('4', { each: true })
  ipWhitelist: string[];
}
