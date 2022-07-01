import { GrpcStreamCall } from '@nestjs/microservices';
import { GrpcServiceMethod } from './interface/grpc-service.method';

export const DuplexStream =
  (method?: string): MethodDecorator =>
  (target: GrpcServiceMethod, propertyKey, descriptor) => {
    const service = target.constructor.serviceName;
    return GrpcStreamCall(service, method)(target, propertyKey, descriptor);
  };
