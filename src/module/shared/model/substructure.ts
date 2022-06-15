import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  EntityNotFoundError,
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
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  static findOneOrFail(args: FindOneOptions) {
    return super.findOneOrFail(args).catch((error) => {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException(this.name + ' not found');
      }

      throw error;
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
