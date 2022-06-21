import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from '../../../model/user';
import { OsType } from './enum/os-type';

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
  createdBy: User;
}
