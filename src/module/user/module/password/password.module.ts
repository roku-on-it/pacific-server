import { Module } from '@nestjs/common';
import { PasswordGrpcService } from './password.grpc.service';
import { EncryptionModule } from '../../../misc/encryption/encryption.module';

@Module({
  imports: [EncryptionModule],
  controllers: [PasswordGrpcService],
})
export class PasswordModule {}
