import { GrpcMethod } from '@nestjs/microservices';
import { GrpcServiceMethod } from './interface/grpc-service.method';

export const ServerStream =
  (method?: string): MethodDecorator =>
  (target: GrpcServiceMethod, propertyKey, descriptor) => {
    const service = target.constructor.serviceName;
    return GrpcMethod(service, method)(target, propertyKey, descriptor);
  };
