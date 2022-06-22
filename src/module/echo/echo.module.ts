import { Module } from '@nestjs/common';
import { EchoService } from './echo.grpc.service';

// Dummy module for example purposes

@Module({ controllers: [EchoService] })
export class EchoModule {}
