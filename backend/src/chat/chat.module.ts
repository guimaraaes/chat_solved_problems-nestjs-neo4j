import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AppGateway } from '../app.gateway';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AppGateway, UserService]
})
export class ChatModule {}
