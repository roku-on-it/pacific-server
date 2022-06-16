import { Module } from '@nestjs/common';
import { UserService } from './user.service';

@Module({
  controllers: [UserService],
})
export class UserModule {}
