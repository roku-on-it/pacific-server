import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { ProtobufRegistryService } from '../misc/service/protobuf-registry/protobuf-registry.service';
import { ProtobufRegistryModule } from '../misc/service/protobuf-registry/protobuf-registry.module';

@Module({
  imports: [ProtobufRegistryModule],
  controllers: [UserService],
})
export class UserModule {
  constructor(private protobufRegistryService: ProtobufRegistryService) {
    protobufRegistryService.addService({
      package: 'user',
      protoPath: __dirname + '/model/user.proto',
    });
  }
}
