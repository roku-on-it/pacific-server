import { Substructure } from '../../shared/model/substructure';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { hash } from 'argon2';
import { Session } from '../module/session/model/session';
import { Settings } from '../module/settings/model/settings';

@Entity()
@Index(['email'], { unique: true })
export class User extends Substructure {
  @Column()
  email: string;

  @Column()
  masterPassword: string;

  @OneToMany(() => Session, (s) => s.createdBy)
  sessions: Session[];

  @OneToOne(() => Settings, (s) => s.createdBy)
  settings: Settings;

  @BeforeInsert()
  protected async beforeInsert(): Promise<void> {
    this.masterPassword = await hash(this.masterPassword);
  }
}
