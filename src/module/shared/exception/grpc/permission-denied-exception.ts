import { RpcException } from '@nestjs/microservices';
import { GrpcExceptionCode } from './enum/grpc-exception-code';

export class PermissionDeniedException extends RpcException {
  constructor(message = 'PERMISSION_DENIED') {
    super({ code: GrpcExceptionCode.PERMISSION_DENIED, message });
  }
}
