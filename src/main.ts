import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: [],
      protoPath: [],
    },
  });

  await app.listen();
}

bootstrap();
