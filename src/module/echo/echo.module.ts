import { Module } from '@nestjs/common';
import { EchoService } from './echo.grpc.service';

@Module({ controllers: [EchoService] })
export class EchoModule {}
