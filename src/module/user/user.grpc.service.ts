import { GrpcService } from '../shared/decorator/class/grpc-service';
import { Ctx, Payload } from '@nestjs/microservices';
import { User } from './model/user';
import { plainToInstance } from 'class-transformer';
import { CreateUser } from './input/create-user';
import { catchError, from, map, Observable, switchMap, throwError } from 'rxjs';
import { LoginResponse } from '../auth/type/login-response';
import { LoginPayload } from '../auth/input/login-payload';
import { AuthService } from '../auth/auth.service';
import { UnauthenticatedException } from '../shared/exception/grpc/unauthenticated-exception';
import { randomUUID } from 'crypto';
import { Metadata } from '@grpc/grpc-js';
import { SessionService } from './module/session/session.service';
import { OsType } from './module/session/model/enum/os-type';
import { UnaryCall } from '../shared/decorator/method/grpc';

@GrpcService()
export class UserGrpcService {
  static serviceName = 'UserService';

  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  @UnaryCall()
  register(@Payload() payload: CreateUser): Observable<User> {
    return from(plainToInstance(User, payload).save());
  }

  @UnaryCall()
  login(
    @Payload() payload: LoginPayload,
    @Ctx() metadata: Metadata,
  ): Observable<LoginResponse> {
    return this.authService.validateUser(payload).pipe(
      catchError(() =>
        throwError(() => new UnauthenticatedException('Invalid credentials')),
      ),
      switchMap((user) => {
        const [ip] = metadata.get('ip');
        const [os] = metadata.get('os');
        const token = randomUUID().replace(/-/g, '');

        return this.sessionService
          .createSession(token, <string>ip, <OsType>(<unknown>os), user)
          .pipe(map(() => ({ token })));
      }),
    );
  }
}
