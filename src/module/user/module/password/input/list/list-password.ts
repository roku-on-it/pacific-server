import { PasswordList } from '../../model/password-list';
import { Password } from '../../model/password';
import { User } from '../../../../model/user';
import { instanceToInstance } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class ListPassword {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  username: string;

  @IsOptional()
  @MaxLength(2048)
  uri: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsInt()
  @Max(50)
  @Min(0)
  pageSize = 5;

  @IsOptional()
  @IsInt()
  @Max(300)
  @Min(0)
  pageIndex = 0;

  async exec(user: User): Promise<PasswordList> {
    const [items, total] = await Password.findAndCount({
      skip: this.pageIndex * this.pageSize,
      take: this.pageSize,
      where: {
        user: { id: user.id },
        ...(this.username && { username: this.username }),
        ...(this.uri && { uri: this.uri }),
        ...(this.description && { description: this.description }),
      },
    });

    return {
      items: items.map((item) => instanceToInstance(item)),
      total,
    };
  }
}
