import { Module } from '@nestjs/common';
import { EchoGrpcService } from './echo.grpc.service';

// Dummy module for example purposes

@Module({
  controllers: [EchoGrpcService],
})
export class EchoModule {}
