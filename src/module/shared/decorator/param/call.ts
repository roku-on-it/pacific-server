import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

export const Call = createParamDecorator(
  (data, context: ExecutionContextHost) => {
    return context.getArgByIndex(2);
  },
);
