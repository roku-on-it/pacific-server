import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class AlreadyExistsException extends RpcException {
  constructor(message = 'ALREADY_EXISTS') {
    super({ code: GrpcExceptionCode.ALREADY_EXISTS, message });
  }
}
