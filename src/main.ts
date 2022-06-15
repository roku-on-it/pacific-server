import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProtobufRegistryService } from './module/misc/service/protobuf-registry/protobuf-registry.service';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const protobufRegistryService = app.get<ProtobufRegistryService>(
    ProtobufRegistryService,
  );
  const gRPCService = await app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: protobufRegistryService.services,
  });

  gRPCService.listen().then(() => {
    Logger.log('gRPC Server successfully started', NestApplication.name);
  });
}

bootstrap();
