import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class AbortedException extends RpcException {
  constructor(message = 'ABORTED') {
    super({ code: GrpcExceptionCode.ABORTED, message });
  }
}
