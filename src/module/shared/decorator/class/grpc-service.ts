import {
  applyDecorators,
  HttpStatus,
  Logger,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GrpcService as $GrpcService } from '@nestjs/microservices';
import { ControllerOptions } from '@nestjs/common/decorators/core/controller.decorator';
import { RpcValidationExceptionFilter } from '../../exception-filter/rpc-validation-exception-filter';

export function GrpcService(options?: ControllerOptions): ClassDecorator {
  return (target) => {
    if (null == target['serviceName']) {
      const message =
        'Class "' +
        target.name +
        '" must statically implement "serviceName" property';
      Logger.error(message);
      throw new TypeError(message);
    }

    if ('string' !== typeof target['serviceName']) {
      throw new TypeError(
        'The "serviceName" property must be of interface string',
      );
    }

    return applyDecorators(
      $GrpcService(options),
      UseFilters(RpcValidationExceptionFilter),
      UsePipes(
        new ValidationPipe({
          transform: true,
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
      ),
    )(target);
  };
}
