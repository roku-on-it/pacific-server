import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AppProtoRegistryService } from './module/misc/app-proto-registry/app-proto-registry.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const protobufRegistryService = app.get<AppProtoRegistryService>(
    AppProtoRegistryService,
  );
  const gRPCService = await app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: protobufRegistryService.services,
  });

  console.log(protobufRegistryService.services);

  gRPCService.listen().then(() => {
    Logger.log('gRPC Server successfully started', NestApplication.name);
  });
}

bootstrap();
