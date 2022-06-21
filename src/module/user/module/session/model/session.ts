import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  FindOneOptions,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../../model/user';
import { OsType } from './enum/os-type';
import { NotFoundException } from '../../../../shared/exception/grpc/not-found-exception';

@Entity()
export class Session extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column('text')
  ip: string;

  @Column({ type: 'enum', enum: OsType, nullable: true })
  os: OsType;

  @ManyToOne(() => User, { nullable: false })
  user: User;

  static findOneOrThrow<T extends Session>(
    this: {
      new (): T;
    } & typeof Session,
    options: FindOneOptions<T>,
  ): Promise<T> {
    const { where, ...rest } = options;
    return super
      .createQueryBuilder()
      .where(where)
      .setFindOptions(rest as FindOneOptions<BaseEntity>)
      .getOne()
      .then((entity) => {
        if (null == entity) {
          throw new NotFoundException(this.name + ' not found');
        }

        return entity as unknown as T;
      });
  }
}
