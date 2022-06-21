import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  FindOneOptions,
  PrimaryGeneratedColumn,
  SaveOptions,
  UpdateDateColumn,
} from 'typeorm';

import { Logger } from '@nestjs/common';
import { InvalidArgumentException } from '../exception/grpc/invalid-argument-exception';
import { AlreadyExistsException } from '../exception/grpc/already-exists-exception';
import { NotFoundException } from '../exception/grpc/not-found-exception';

export class Substructure extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static findOneOrThrow<T extends Substructure>(
    this: {
      new (): T;
    } & typeof Substructure,
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

  save(options?: SaveOptions): Promise<this> {
    return super.save(options).catch((error) => {
      switch (error.code) {
        case '23505':
          throw new AlreadyExistsException();
        case '23502':
          Logger.debug(error, this.constructor.name);

          throw new InvalidArgumentException(
            error.column + ' should not be null',
          );
        default:
          throw error;
      }
    });
  }
}
