import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class InvalidArgumentException extends RpcException {
  constructor(message = 'INVALID_ARGUMENT') {
    super({ code: GrpcExceptionCode.INVALID_ARGUMENT, message });
  }
}
