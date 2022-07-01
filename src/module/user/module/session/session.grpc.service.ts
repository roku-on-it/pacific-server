import { Payload } from '@nestjs/microservices';
import { CurrentSession } from '../../../shared/decorator/param/current-session';
import { map, mergeAll, Observable, pluck, Subject, switchMap } from 'rxjs';
import { User } from '../../model/user';
import { Session } from './model/session';
import { UnauthenticatedException } from '../../../shared/exception/grpc/unauthenticated-exception';
import { GrpcService } from '../../../shared/decorator/class/grpc-service';
import { ServerStream, UnaryCall } from '../../../shared/decorator/method/grpc';
import { instanceToInstance } from 'class-transformer';

@GrpcService()
export class SessionService {
  static serviceName = 'SessionService';

  @ServerStream()
  list(
    @CurrentSession(['user.sessions']) currentUser: Observable<User>,
  ): Observable<Session> {
    const subject = new Subject<Session>();

    currentUser
      .pipe(
        pluck('user', 'sessions'),
        mergeAll(),
        map((s) => instanceToInstance(s)),
      )
      .subscribe({
        next: (chunk: Session) => {
          subject.next(chunk);
        },
        complete: () => subject.complete(),
        error: (err) => {
          subject.error(err);
        },
      });

    return subject.asObservable();
    // Or can be done as -> return user.pipe(pluck('sessions'), mergeAll());
  }

  @UnaryCall()
  delete(
    @Payload('token') token: string,
    @CurrentSession() currentSession: Observable<Session>,
  ): Observable<Session> {
    if (null == token) {
      throw new UnauthenticatedException();
    }

    return currentSession.pipe(
      switchMap((session) => instanceToInstance(session.remove())),
    );
  }
}
