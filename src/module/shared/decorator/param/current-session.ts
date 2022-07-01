import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';
import { Session } from '../../../user/module/session/model/session';
import { UnauthenticatedException } from '../../exception/grpc/unauthenticated-exception';
import { from, Observable } from 'rxjs';

export const CurrentSession = createParamDecorator(
  (relations: string[], context: ExecutionContext): Observable<Session> => {
    const ctx: Metadata = context.switchToRpc().getContext();
    const streamCtx = context.switchToRpc().getData();

    // If ctx isn't instance of Metadata, it means it is a stream call
    const [qid] = ((ctx.get ? ctx : null) ?? streamCtx.metadata).get('qid');

    if (null == qid) {
      throw new UnauthenticatedException();
    }

    const session = Session.findOneOrThrow({
      where: { id: <string>qid },
      relations,
    });

    return from(session);
  },
);
