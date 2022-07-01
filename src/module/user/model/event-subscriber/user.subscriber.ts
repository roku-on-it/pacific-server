import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { User } from '../user';
import { Settings } from '../../module/settings/model/settings';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterInsert({
    entity: user,
    manager,
  }: InsertEvent<User>): Promise<void> {
    await manager.getRepository(Settings).save({ user });
  }
}
