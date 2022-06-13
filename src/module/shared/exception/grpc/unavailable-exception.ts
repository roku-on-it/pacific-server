import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class UnavailableException extends RpcException {
  constructor(message = 'UNAVAILABLE') {
    super({ code: GrpcExceptionCode.UNAVAILABLE, message });
  }
}
