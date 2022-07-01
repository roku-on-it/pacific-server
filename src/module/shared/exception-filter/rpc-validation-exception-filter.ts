import {
  ArgumentsHost,
  Catch,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BaseRpcExceptionFilter } from '@nestjs/microservices';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { InvalidArgumentException } from '../exception/grpc/invalid-argument-exception';

@Catch(UnprocessableEntityException)
export class RpcValidationExceptionFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const metadata = new Metadata();
    const messages = (exception.getResponse() as any).message;

    for (let i = 0; i < messages.length; i++) {
      metadata.add('validation-error-' + (i + 1), messages[i]);
    }

    const unaryCall: ServerUnaryCall<any, any> = host.getArgByIndex(2);

    unaryCall.sendMetadata(metadata);

    return super.catch(new InvalidArgumentException(), host);
  }
}
