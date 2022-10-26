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
import { ILike } from 'typeorm';

export class ListPassword {
  @IsOptional()
  @IsString()
  @MaxLength(2048)
  query: string;

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
      where: [
        { user: { id: user.id }, uri: ILike('%' + (this.query ?? '') + '%') },
        {
          user: { id: user.id },
          username: ILike('%' + (this.query ?? '') + '%'),
        },
        {
          user: { id: user.id },
          description: ILike('%' + (this.query ?? '') + '%'),
        },
      ],
    });

    return {
      items: items.map((item) => instanceToInstance(item)),
      total,
    };
  }
}
