import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class DataLossException extends RpcException {
  constructor(message = 'DATA_LOSS') {
    super({ code: GrpcExceptionCode.DATA_LOSS, message });
  }
}
