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
import { Password } from '../module/password/model/password';

@Entity()
@Index(['email'], { unique: true })
export class User extends Substructure {
  @Column()
  email: string;

  @Column()
  masterPassword: string;

  @OneToMany(() => Session, (s) => s.user)
  sessions: Session[];

  @OneToOne(() => Settings, (s) => s.user)
  settings: Settings;

  @OneToMany(() => Password, (p) => p.user)
  passwords: Password[];

  @BeforeInsert()
  protected async beforeInsert(): Promise<void> {
    this.masterPassword = await hash(this.masterPassword);
  }
}
