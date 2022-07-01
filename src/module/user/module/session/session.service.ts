import { Injectable } from '@nestjs/common';
import { isIPv4 } from 'net';
import { OsType } from './model/enum/os-type';
import { InvalidArgumentException } from '../../../shared/exception/grpc/invalid-argument-exception';
import { plainToInstance } from 'class-transformer';
import { Session } from './model/session';
import { from, Observable } from 'rxjs';
import { User } from '../../model/user';
import { UnauthenticatedException } from '../../../shared/exception/grpc/unauthenticated-exception';

@Injectable()
export class SessionService {
  createSession(
    token: string,
    ip: string,
    os: OsType,
    user: User,
  ): Observable<Session> {
    const { ipWhitelist } = user.settings;

    if (ipWhitelist?.length > 0 && !ipWhitelist.includes(ip)) {
      throw new UnauthenticatedException();
    }

    if (!isIPv4(<string>ip) || !OsType[Number(os)]) {
      throw new InvalidArgumentException('Insufficient metadata');
    }

    return from(
      plainToInstance(Session, {
        id: token,
        ip,
        os,
        user,
      }).save(),
    );
  }
}
