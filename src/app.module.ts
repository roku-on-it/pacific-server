import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { AppConfigModule } from './module/misc/app-config/app-config.module';
import { AppTypeormModule } from './module/misc/app-typeorm/app-typeorm.module';
import { AppProtoRegistryModule } from './module/misc/app-proto-registry/app-proto-registry.module';
import { EchoModule } from './module/echo/echo.module';

@Module({
  imports: [
    AppProtoRegistryModule,
    AppConfigModule,
    AppTypeormModule,
    UserModule,
    EchoModule,
  ],
})
export class AppModule {}
