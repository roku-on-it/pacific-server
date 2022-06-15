import {
  applyDecorators,
  HttpStatus,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcService as $GrpcService } from '@nestjs/microservices';
import { ControllerOptions } from '@nestjs/common/decorators/core/controller.decorator';
import { RpcValidationExceptionFilter } from '../../exception-filter/rpc-validation-exception-filter';
import { ParseGrpcDateInterceptor } from '../../interceptor/parse-grpc-date.interceptor';

export function GrpcService(options?: ControllerOptions) {
  return applyDecorators(
    $GrpcService(options),
    UseFilters(RpcValidationExceptionFilter),
    UseInterceptors(ParseGrpcDateInterceptor),
    UsePipes(
      new ValidationPipe({
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    ),
  );
}
