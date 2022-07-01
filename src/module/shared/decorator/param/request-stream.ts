import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ServerReadableStream } from '@grpc/grpc-js';

export interface StreamCall<RequestType, ResponseType> {
  stream: ServerReadableStream<RequestType, ResponseType>;
  respond: (err: unknown, value: ResponseType) => void;
}

export const RequestStream = createParamDecorator(
  (data, context: ExecutionContextHost) => {
    return {
      stream: context.switchToRpc().getData(),
      respond: context.switchToRpc().getContext(),
    };
  },
);
