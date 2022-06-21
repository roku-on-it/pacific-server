import { GrpcStreamCall } from '@nestjs/microservices';

export const ClientStream = (
  service?: string,
  method?: string,
): MethodDecorator => GrpcStreamCall(service, method);
