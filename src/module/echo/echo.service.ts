import { GrpcService } from '@nestjs/microservices';
import {
  Metadata,
  ServerDuplexStream,
  ServerReadableStream,
  ServerUnaryCall,
  ServerWritableStream,
} from '@grpc/grpc-js';
import { InvalidArgumentException } from '../shared/exception/grpc/invalid-argument-exception';
import {
  ClientStream,
  DuplexStream,
  ServerStream,
  UnaryCall,
} from '../shared/decorator/method/grpc';

interface ExampleRequest {
  name: string;
}

interface ExampleResponse {
  message: string;
}

interface ExampleDuplexRequest {
  value: number;
}

interface ExampleDuplexResponse {
  result: number;
}

@GrpcService()
export class EchoService {
  @UnaryCall()
  unaryCall(
    payload: ExampleRequest,
    metadata: Metadata,
    call: ServerUnaryCall<ExampleRequest, ExampleResponse>,
  ) {
    return {
      message: 'Hello ' + payload.name,
    };
  }

  @ServerStream()
  streamingFromServer(
    payload: ExampleRequest,
    metadata: Metadata,
    call: ServerWritableStream<ExampleRequest, ExampleResponse>,
  ) {
    const [count] = metadata.get('count');

    if (count == null) {
      throw new InvalidArgumentException('Metadata "count" must be a number');
    }

    for (let i = 0; i < +count; i++) {
      // Writing the same chunk to response stream for "count" times
      call.write({
        message: 'Hello ' + payload.name,
      });
    }

    call.end();
  }

  @ClientStream()
  streamingFromClient(
    requestStream: ServerReadableStream<ExampleRequest, ExampleResponse>,
    callback: (err: unknown, value: ExampleResponse) => void,
  ) {
    const names = [];

    // Pushing chunk to "names" array everytime a chunk is received from client-streaming
    requestStream.on('data', (chunk) => {
      names.push(chunk.name);
    });

    // Returning all the names to final response
    requestStream.on('end', () => {
      callback(null, { message: names.join(', ') });
    });
  }

  @DuplexStream()
  streamingBothWays(
    call: ServerDuplexStream<ExampleDuplexRequest, ExampleDuplexResponse>,
  ) {
    let sum = 0;

    call.on('data', (chunk) => {
      console.log(chunk);

      sum += chunk.value;

      if (sum > 100 || chunk.value > 100) {
        throw new InvalidArgumentException(
          'Summary must not be greater than 100',
        );
      }

      if (sum === 100) {
        call.write({ result: sum });
        call.end();
      }

      call.write({ result: sum });
    });
  }
}
