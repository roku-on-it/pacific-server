import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class UnauthenticatedException extends RpcException {
  constructor(message = 'UNAUTHENTICATED') {
    super({ code: GrpcExceptionCode.UNAUTHENTICATED, message });
  }
}
