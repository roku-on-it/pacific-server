import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class OutOfRangeException extends RpcException {
  constructor(message = 'OUT_OF_RANGE') {
    super({ code: GrpcExceptionCode.OUT_OF_RANGE, message });
  }
}
