import { GrpcService } from '../../../shared/decorator/class/grpc-service';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { UpdateSettings } from './input/update-settings';
import { CurrentSession } from '../../../shared/decorator/param/current-session';
import { plainToClassFromExist } from 'class-transformer';
import { map, Observable, switchMap } from 'rxjs';
import { Settings } from './model/settings';
import { Session } from '../session/model/session';

@GrpcService()
export class SettingsService {
  @GrpcMethod()
  update(
    @Payload() payload: UpdateSettings,
    @CurrentSession(['user.settings']) session: Observable<Session>,
  ): Observable<Settings> {
    return session.pipe(
      switchMap((session) =>
        plainToClassFromExist(session.user.settings, payload).save(),
      ),
    );
  }

  @GrpcMethod()
  settings(
    @CurrentSession(['user.settings']) session: Observable<Session>,
  ): Observable<Settings> {
    return session.pipe(map((session) => session.user.settings));
  }
}
