import { Module } from '@nestjs/common';
import { UserGrpcService } from './user.grpc.service';
import { SessionModule } from './module/session/session.module';
import { AuthModule } from '../auth/auth.module';
import { SettingsModule } from './module/settings/settings.module';
import { PasswordModule } from './module/password/password.module';

@Module({
  imports: [SessionModule, SettingsModule, AuthModule, PasswordModule],
  controllers: [UserGrpcService],
})
export class UserModule {}
