import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionService as SessionGrpcService } from './session.grpc.service';

@Module({
  controllers: [SessionGrpcService],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
