import { UpdateModel } from '../../../../shared/input/update-model';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class UpdatePassword extends UpdateModel {
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  password: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  uri: string;

  @IsOptional()
  @IsUrl()
  @MaxLength(2048)
  imageSrc: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}
