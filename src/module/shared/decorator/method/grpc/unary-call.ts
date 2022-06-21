import { GrpcMethod } from '@nestjs/microservices';

export const UnaryCall = (service?: string, method?: string): MethodDecorator =>
  GrpcMethod(service, method);
