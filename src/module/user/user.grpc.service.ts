import { GrpcService } from '../shared/decorator/class/grpc-service';
import { Ctx, GrpcMethod, Payload } from '@nestjs/microservices';
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

@GrpcService()
export class UserService {
  constructor(
    private authService: AuthService,
    private sessionService: SessionService,
  ) {}

  @GrpcMethod()
  register(@Payload() payload: CreateUser): Observable<User> {
    return from(plainToInstance(User, payload).save());
  }

  @GrpcMethod()
  login(
    @Payload() payload: LoginPayload,
    @Ctx() metadata: Metadata,
  ): Observable<LoginResponse> {
    return this.authService.validateUser(payload).pipe(
      catchError(() =>
        throwError(() => new UnauthenticatedException('Invalid credentials')),
      ),
      switchMap((createdBy) => {
        const [ip] = metadata.get('ip');
        const [os] = metadata.get('os');
        const token = randomUUID().replace(/-/g, '');

        return this.sessionService
          .createSession(token, <string>ip, <OsType>(<unknown>os), createdBy)
          .pipe(map(() => ({ token })));
      }),
    );
  }
}
