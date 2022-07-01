import { Module } from '@nestjs/common';
import { SettingsService } from './settings.grpc.service';

@Module({
  controllers: [SettingsService],
})
export class SettingsModule {}
