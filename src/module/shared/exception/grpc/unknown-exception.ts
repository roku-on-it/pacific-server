import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class UnknownException extends RpcException {
  constructor(message = 'UNKNOWN') {
    super({ code: GrpcExceptionCode.UNKNOWN, message });
  }
}
