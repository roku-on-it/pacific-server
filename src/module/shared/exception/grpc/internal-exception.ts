import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class InternalException extends RpcException {
  constructor(message = 'INTERNAL') {
    super({ code: GrpcExceptionCode.INTERNAL, message });
  }
}
