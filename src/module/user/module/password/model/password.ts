import { Substructure } from '../../../../shared/model/substructure';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../../../model/user';

@Entity()
export class Password extends Substructure {
  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  uri: string;

  @Column({ nullable: true })
  imageSrc: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (u) => u.passwords, { nullable: false })
  user: User;
}
