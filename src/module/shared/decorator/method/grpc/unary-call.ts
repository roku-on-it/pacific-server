import { GrpcMethod } from '@nestjs/microservices';
import { GrpcServiceMethod } from './interface/grpc-service.method';

export const UnaryCall = (method?: string): MethodDecorator => {
  return (target: GrpcServiceMethod, propertyKey, descriptor) => {
    const service = target.constructor.serviceName;
    return GrpcMethod(service, method)(target, propertyKey, descriptor);
  };
};
