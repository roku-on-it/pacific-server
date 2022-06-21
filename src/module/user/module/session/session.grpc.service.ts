import { GrpcMethod, GrpcService } from '@nestjs/microservices';
import { CurrentUser } from '../../../shared/decorator/param/current-user';
import { mergeAll, Observable, pluck, Subject } from 'rxjs';
import { User } from '../../model/user';
import { Session } from './model/session';

@GrpcService()
export class SessionService {
  @GrpcMethod() // Server streamingg
  list(@CurrentUser(['sessions']) user: Observable<User>): Observable<Session> {
    const subject = new Subject<Session>();

    user.pipe(pluck('sessions'), mergeAll()).subscribe({
      next: (chunk: Session) => {
        subject.next(chunk);
      },
      complete: () => subject.complete(),
    });

    return subject.asObservable();
    // Or can be done as -> return user.pipe(pluck('sessions'), mergeAll());
  }
}
