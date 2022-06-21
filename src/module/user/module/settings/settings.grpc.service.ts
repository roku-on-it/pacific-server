import { GrpcService } from '../../../shared/decorator/class/grpc-service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UpdateSettings } from './input/update-settings';
import { CurrentUser } from '../../../shared/decorator/param/current-user';
import { plainToClassFromExist } from 'class-transformer';
import { User } from '../../model/user';
import { map, Observable, switchMap } from 'rxjs';
import { Settings } from './model/settings';

@GrpcService()
export class SettingsService {
  @GrpcMethod()
  update(
    @Payload() payload: UpdateSettings,
    @CurrentUser(['settings']) user: Observable<User>,
  ): Observable<Settings> {
    return user.pipe(
      switchMap((user) => plainToClassFromExist(user.settings, payload).save()),
    );
  }

  @GrpcMethod()
  list(
    @CurrentUser(['settings']) user: Observable<User>,
  ): Observable<Settings> {
    return user.pipe(map((user) => user.settings));
  }
}
