import { Substructure } from '../../shared/model/substructure';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { hash } from 'argon2';

@Entity()
@Index(['email'], { unique: true })
export class User extends Substructure {
  @Column()
  email: string;

  @Column()
  masterPassword: string;

  @BeforeInsert()
  protected async beforeInsert(): Promise<void> {
    this.masterPassword = await hash(this.masterPassword);
  }
}
