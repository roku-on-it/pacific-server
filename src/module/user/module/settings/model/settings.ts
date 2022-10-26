import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  PrimaryColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../../../model/user';
import { Transform } from 'class-transformer';

@Entity()
export class Settings extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Transform(({ value }) => value.getTime())
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id' })
  user: User;
}
