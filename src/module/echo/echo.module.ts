import { Module } from '@nestjs/common';
import { EchoService } from './echo.service';

@Module({ controllers: [EchoService] })
export class EchoModule {}
