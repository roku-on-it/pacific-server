import { Injectable } from '@nestjs/common';
import { User } from '../user/model/user';
import { from, map, Observable, switchMap } from 'rxjs';
import { verify } from 'argon2';
import { LoginPayload } from './input/login-payload';
import { UnauthenticatedException } from '../shared/exception/grpc/unauthenticated-exception';

@Injectable()
export class AuthService {
  validateUser(payload: LoginPayload): Observable<User> {
    return this.findByEmail(payload.email).pipe(
      switchMap((user) =>
        this.comparePasswords(user.masterPassword, payload.masterPassword).pipe(
          map((passwordMatches) => {
            if (passwordMatches) {
              return user;
            }

            throw new UnauthenticatedException();
          }),
        ),
      ),
    );
  }

  comparePasswords(
    hashedPassword: string,
    masterPassword: string,
  ): Observable<boolean> {
    return from(verify(hashedPassword, masterPassword));
  }

  findByEmail(email: string): Observable<User> {
    return from(
      User.findOneOrThrow({
        where: { email },
        relations: ['settings'],
      }),
    );
  }
}
