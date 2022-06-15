import { Module } from '@nestjs/common';
import { ProtobufRegistryService } from './protobuf-registry.service';

@Module({
  providers: [ProtobufRegistryService],
  exports: [ProtobufRegistryService],
})
export class ProtobufRegistryModule {}
