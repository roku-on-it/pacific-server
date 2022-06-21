import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Session } from '../../../user/module/session/model/session';
import { UnauthenticatedException } from '../../exception/grpc/unauthenticated-exception';
import { from, map, Observable } from 'rxjs';
import { User } from '../../../user/model/user';

export const CurrentUser = createParamDecorator(
  (relations: string[], context: ExecutionContext): Observable<User> => {
    const metadata: Metadata = context.switchToRpc().getContext();
    const [qid] = metadata.get('qid');

    if (null == qid) {
      throw new UnauthenticatedException();
    }

    const session = Session.findOneOrFail({
      where: { id: <string>qid },

      relations:
        null == relations
          ? ['createdBy']
          : relations.map((value) => 'createdBy.' + value),
    }).catch(() => {
      throw new UnauthenticatedException();
    });

    return from(session).pipe(
      map((value) => {
        return value.createdBy;
      }),
    );
  },
);
