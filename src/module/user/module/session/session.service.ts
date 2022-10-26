import { Injectable } from '@nestjs/common';
import { isIPv4 } from 'net';
import { OsType } from './model/enum/os-type';
import { InvalidArgumentException } from '../../../shared/exception/grpc/invalid-argument-exception';
import { plainToInstance } from 'class-transformer';
import { Session } from './model/session';
import { from, Observable } from 'rxjs';
import { User } from '../../model/user';

@Injectable()
export class SessionService {
  createSession(
    token: string,
    ip: string,
    os: OsType,
    user: User,
  ): Observable<Session> {
    return from(
      plainToInstance(Session, {
        ip,
        user,
        id: token,
        os: OsType[os],
      }).save(),
    );
  }
}
