import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class ResourceExhaustedException extends RpcException {
  constructor(message = 'RESOURCE_EXHAUSTED') {
    super({ code: GrpcExceptionCode.RESOURCE_EXHAUSTED, message });
  }
}
