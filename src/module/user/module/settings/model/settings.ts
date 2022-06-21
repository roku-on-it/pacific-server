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

@Entity()
export class Settings extends BaseEntity {
  @PrimaryColumn('uuid')
  id: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  theme: boolean;

  @Column({ type: 'simple-array', nullable: true, default: null })
  ipWhitelist: string[];

  @OneToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'id' })
  createdBy: User;
}
