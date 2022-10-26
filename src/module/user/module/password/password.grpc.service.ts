import { GrpcService } from '../../../shared/decorator/class/grpc-service';
import {
  ClientStream,
  DuplexStream,
  UnaryCall,
} from '../../../shared/decorator/method/grpc';
import { Metadata, ServerDuplexStream } from '@grpc/grpc-js';
import { CreatePassword } from './input/create-password';
import { CreatePasswordResponse } from './type/create-password-response';
import { Password } from './model/password';
import { validateStreamChunk } from '../../../shared/helper/validate-stream-chunk';
import { InvalidArgumentException } from '../../../shared/exception/grpc/invalid-argument-exception';
import { Payload } from '@nestjs/microservices';
import { EncryptionService } from '../../../misc/encryption/encryption.service';
import { UpdatePassword } from './input/update-password';
import { Observable, switchMap } from 'rxjs';
import { CurrentSession } from '../../../shared/decorator/param/current-session';
import { Session } from '../session/model/session';
import {
  RequestStream,
  StreamCall,
} from '../../../shared/decorator/param/request-stream';
import { UnauthenticatedException } from '../../../shared/exception/grpc/unauthenticated-exception';
import {
  instanceToInstance,
  plainToClassFromExist,
  plainToInstance,
} from 'class-transformer';
import { ListPassword } from './input/list/list-password';
import { PasswordList } from './model/password-list';
import { ServerReadableStreamImpl } from '@grpc/grpc-js/build/src/server-call';

@GrpcService()
export class PasswordGrpcService {
  static serviceName = 'PasswordService';

  constructor(private encryptionService: EncryptionService) {}

  @DuplexStream()
  list(
    @RequestStream()
    { stream }: { stream: ServerDuplexStream<ListPassword, PasswordList> },
    @CurrentSession(['user']) session: Observable<Session>,
  ) {
    session.subscribe((session) => {
      stream.on('data', async (chunk) => {
        await validateStreamChunk(ListPassword, chunk).then((errors) => {
          if (0 !== errors.length) {
            const metadata = new Metadata();

            for (let i = 0; i < errors.length; i++) {
              metadata.set('validation-error-' + (i + 1), errors[i]);
            }

            stream.sendMetadata(metadata);
            stream.destroy(new InvalidArgumentException().getError() as Error);
          }
        });

        const passwordList = await plainToInstance(ListPassword, chunk).exec(
          session.user,
        );

        for (const item of passwordList.items) {
          item.password = this.encryptionService.decrypt(item.password);
        }

        stream.write(passwordList);
      });
    });
  }

  @ClientStream()
  create(
    @CurrentSession(['user']) session: Observable<Session>,
    @RequestStream()
    { stream, respond }: StreamCall<CreatePassword, CreatePasswordResponse>,
  ) {
    session.subscribe({
      next: (session) => {
        const passwordsToBeCreated: Password[] = [];

        stream.on('data', (chunk) => {
          this.validateClientStream(stream, chunk, respond);

          chunk.password = this.encryptionService.encrypt(chunk.password);
          chunk.user = session.user;

          passwordsToBeCreated.push(chunk);
        });

        stream.once('end', async () => {
          if (!stream.cancelled) {
            const passwords = await Password.save(passwordsToBeCreated);
            const items = passwords.map((item) => {
              item.password = this.encryptionService.encrypt(item.password);
              return plainToInstance(Password, item);
            });

            respond(null, { items });
          }
        });
      },
      error: (err) => {
        respond(err.getError(), null);
      },
    });
  }

  @UnaryCall()
  update(
    @CurrentSession(['user.passwords']) session,
    @Payload() payload: UpdatePassword,
  ) {
    return session.pipe(
      switchMap(async ({ user }: Session) => {
        const password = user.passwords.find((p) => p.id === payload.id);

        if (null == password) {
          throw new UnauthenticatedException();
        }

        return instanceToInstance(
          plainToClassFromExist(password, payload).save(),
        );
      }),
    );
  }

  validateClientStream(
    requestStream,
    chunk,
    callback: (err: string | object, value: null) => void,
  ): void {
    validateStreamChunk(CreatePassword, chunk).then((errors) => {
      if (0 !== errors.length) {
        const metadata = new Metadata();

        for (let i = 0; i < errors.length; i++) {
          metadata.set('validation-error-' + (i + 1), errors[i]);
        }

        requestStream.sendMetadata(metadata);
        callback(new InvalidArgumentException().getError(), null);
      }
    });
  }
}
