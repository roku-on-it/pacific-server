import { Substructure } from '../../shared/model/substructure';
import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import { hash } from 'argon2';

@Entity()
@Index(['username'], { unique: true })
export class User extends Substructure {
  @Column()
  username: string;

  @Column()
  password: string;

  @BeforeInsert()
  protected async beforeInsert(): Promise<void> {
    this.password = await hash(this.password);
  }
}
