import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AppGateway } from '../app.gateway';

@Module({
  controllers: [UserController],
  providers: [UserService, AppGateway]
})
export class UserModule {}
