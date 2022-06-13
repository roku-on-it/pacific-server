import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class NotFoundException extends RpcException {
  constructor(message = 'NOT_FOUND') {
    super({ code: GrpcExceptionCode.NOT_FOUND, message });
  }
}
