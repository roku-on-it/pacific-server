import { GrpcStreamCall } from '@nestjs/microservices';

export const DuplexStream = (
  service?: string,
  method?: string,
): MethodDecorator => GrpcStreamCall(service, method);
