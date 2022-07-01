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

  @Column({ type: 'simple-array', nullable: true, default: null })
  ipWhitelist: string[];

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id' })
  user: User;
}
