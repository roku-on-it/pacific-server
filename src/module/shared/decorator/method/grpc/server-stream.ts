import { GrpcMethod } from '@nestjs/microservices';

export const ServerStream = (
  service?: string,
  method?: string,
): MethodDecorator => GrpcMethod(service, method);
